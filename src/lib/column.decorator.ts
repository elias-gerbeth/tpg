import { TSType } from './query-builder/types';

// export interface ColumnOptions { }
// export function ColumnOpt(options?: ColumnOptions): PropertyDecorator {
//     return (target: Object, propertyKey: string | symbol) => { };
// }

export const Column = (target: any, propertyKey: string | symbol) => {
    const columns = Reflect.getOwnMetadata("columns", target.constructor) || [];
    columns.push(propertyKey);
    Reflect.defineMetadata("columns", columns, target.constructor);
};


// export const ColumnRef = (target: Object, propertyKey: string | symbol) => { };

export function getTableColumnType<TABLE>(table: new () => TABLE, columnPropertyName: keyof TABLE): TSType {
    const typ = Reflect.getMetadata("design:type", table.prototype, columnPropertyName.toString());
    return typ ? typ.name : undefined;
}

export function getTableColumnNames<TABLE>(Table: new () => TABLE): Array<keyof TABLE> {
    return Reflect.getOwnMetadata("columns", Table.prototype.constructor) || [];
}

export interface TableColumn {
    name: string;
    type: TSType;
}
export function getColumns<TABLE>(Table: new () => TABLE): TableColumn[] {
    const columnNames: Array<keyof TABLE> = getTableColumnNames(Table);
    return columnNames.map(name => ({
        name: name.toString(),
        type: getTableColumnType(Table, name),
    }));
}