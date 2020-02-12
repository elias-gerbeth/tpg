import pg from 'pg';
import { getColumns } from '../column.decorator';
import { underscorize } from '../util/underscorize';
import { tsToSqlType } from './types';

export class SchemaBuilder {
    public createTableSql<TABLE>(Table: new () => TABLE): string {
        const tableName = underscorize(Table.name);
        const columns = getColumns(Table);
        console.log("TCL: SchemaBuilder -> columns", columns);
        const columnsSQL = columns.map(column => {
            return `${underscorize(column.name)} ${tsToSqlType(column.type)}`;
        }).join(',');
        console.log("TCL: SchemaBuilder -> columnsSQL", columnsSQL);

        return `CREATE TABLE IF NOT EXISTS ${tableName} (${columnsSQL})`;
    }

    public async createTable<TABLE>(client: pg.Client, Table: new () => TABLE): Promise<void> {
        const sql = this.createTableSql(Table);
        console.log("TCL: SchemaBuilder -> sql", sql);
        await client.query(sql);
    }

    public createDatabaseSql<DATABASE>(Database: new () => DATABASE): string {
        return `CREATE DATABASE ${underscorize(Database.name)};`;
    }

    public async createDatabase<DATABASE>(client: pg.Client, Database: new () => DATABASE): Promise<void> {
        const sql = this.createDatabaseSql(Database);
        console.log("TCL: SchemaBuilder -> sql", sql);
        try { await client.query(sql); } catch (err) { console.log(sql, 'failed, database already exists!', err.message); }
    }
}