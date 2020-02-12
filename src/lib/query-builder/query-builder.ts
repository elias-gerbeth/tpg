import pg from 'pg';
import { getColumns, TableColumn } from '../column.decorator';
import { underscorize } from '../util/underscorize';
import { FilterTableColumnsBySelects } from './types';

export interface QueryParams {
    from?: string;
    selects?: string;
    where?: string;

    limit?: number;
    skip?: number;

    page?: number;
    perPage?: number;
}

interface QBStep<T> {
    sql: string;
    returnType: T;
}

export class SelectQueryBuilder {

    // public findMany<TABLE>(Table: new () => TABLE, queryParams?: QueryParams): any {
    //     const limit = queryParams?.limit || queryParams?.perPage;
    //     const skip = queryParams?.skip || (queryParams?.page - 1) * queryParams?.perPage;
    //     const tableAlias = this.generateTableAlias(Table);
    //     const where = null; // TODO:

    //     const selects = [];
    //     const columns = getColumns(Table);
    //     columns.forEach(c => {
    //         const columnAlias = this.generateColumnAlias(c);
    //         const columnName = `${tableAlias}.${underscorize(c.name)}`;
    //         selects.push(`${tableAlias}.${columnName} as ${tableAlias}_${columnAlias}`);
    //     });

    //     return `` +
    //         `SELECT ${selects.join(', ')} ` +
    //         `FROM ${underscorize(Table.name)} as ${tableAlias} ` +
    //         where ? `WHERE ${where} ` : `` +
    //         ``.trim();
    // }

    public async select<TABLE, SEL extends Partial<TABLE>>(client: pg.Client, Table: new () => TABLE, select?: SEL): Promise<Array<FilterTableColumnsBySelects<TABLE, SEL>>> {

        const columns = getColumns(Table);
        const tableName = this.getTableName(Table);
        const selects = columns
            .filter(c => !select || Object.keys(select).some(k => k === c.name))
            .map(c => {
                const dashName = underscorize(c.name);
                return `${dashName} as "${c.name}"`; // map to result interface names
            })
            .join(', ');
        const q = `SELECT ${selects} from ${tableName}`;
        console.log("TCL: SelectQueryBuilder -> q", q);
        const result = await client.query(q);
        console.log("TCL: SelectQueryBuilder -> result", result.rows, result.rowCount);
        return result.rows as Array<FilterTableColumnsBySelects<TABLE, SEL>>;
    }

    public generateFrom<TABLE>(Table: new () => TABLE): QBStep<any> {
        const tableName = this.getTableName(Table);
        const tableAlias = tableName; // TODO: shorten? return somehow so we can refer to it?
        return {
            sql: `FROM ${tableName} as ${tableAlias}`,
            returnType: null,
        };
    }
    private generateTableAlias<TABLE>(table: new () => TABLE): string {
        return underscorize(table.name);
    }
    private generateColumnAlias(column: TableColumn): string {
        return underscorize(column.name);
    }

    private getTableName<TABLE>(Table: new () => TABLE): string {
        return underscorize(Table.name);
    }

}