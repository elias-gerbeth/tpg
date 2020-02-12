import { TableClass } from '../table.class';
import { SQLGeneratable } from './sql-generatable.interface';

export interface SelectTableAlias {
    name: string;
    table: TableClass;
}
export class SelectTable implements SQLGeneratable {
    public alias: SelectTableAlias;

    public toSql(): string {
        return `${this.alias}`;
    }
}
