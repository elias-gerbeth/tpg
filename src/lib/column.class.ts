export type ColumnType = string | number;

export class ColumnClass<T extends ColumnType = any> {
    public name: string;
    public value: T;
    public nullable = false;
    public defaultValue?: T;
}