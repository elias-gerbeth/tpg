import { TableClass } from '../table.class';
import { SelectColumn } from './select-column.class';
import { SQLGeneratable } from './sql-generatable.interface';

export class JoinStatement implements SQLGeneratable {
    public table: TableClass;
    public column: SelectColumn;
    public alias: SelectColumn;

    public toSql(): string {
        return ``;
    }
}