import { ColumnClass } from '../column.class';
import { TableClass } from '../table.class';
import { SQLGeneratable } from './sql-generatable.interface';

export interface SelectColumnAlias {
    name: string;
}

export class SelectColumn implements SQLGeneratable {
    public from: TableClass;
    public col: ColumnClass;
    public alias: SelectColumnAlias;

    public toSql(): string {
        return `${this.from.name}`;
    }
}
