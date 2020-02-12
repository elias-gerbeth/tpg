export type TSType = 'String' | 'Number' | 'Boolean' | 'Object' | 'undefined';
export type PGType = 'BOOL' | 'BYTEA' | 'CHAR' | 'INT8' | 'INT2' | 'INT4' | 'REGPROC' | 'TEXT' | 'OID' | 'TID' | 'XID' | 'CID' | 'JSON' | 'XML' | 'PG_NODE_TREE' | 'SMGR' | 'PATH' | 'POLYGON' | 'CIDR' | 'FLOAT4' | 'FLOAT8' | 'ABSTIME' | 'RELTIME' | 'TINTERVAL' | 'CIRCLE' | 'MACADDR8' | 'MONEY' | 'MACADDR' | 'INET' | 'ACLITEM' | 'BPCHAR' | 'VARCHAR' | 'DATE' | 'TIME' | 'TIMESTAMP' | 'TIMESTAMPTZ' | 'INTERVAL' | 'TIMETZ' | 'BIT' | 'VARBIT' | 'NUMERIC' | 'REFCURSOR' | 'REGPROCEDURE' | 'REGOPER' | 'REGOPERATOR' | 'REGCLASS' | 'REGTYPE' | 'UUID' | 'TXID_SNAPSHOT' | 'PG_LSN' | 'PG_NDISTINCT' | 'PG_DEPENDENCIES' | 'TSVECTOR' | 'TSQUERY' | 'GTSVECTOR' | 'REGCONFIG' | 'REGDICTIONARY' | 'JSONB' | 'REGNAMESPACE' | 'REGROLE';

export function tsToSqlType(tsType: TSType): PGType {
    switch (tsType) {
        case 'String': return 'TEXT';
        case 'Number': return 'INT8';
        default: throw new Error('unknown type: ' + tsType);
    }
}


export type FilterTableColumnsBySelects<T, O extends Partial<T>> = O extends undefined ? T : Pick<T, Extract<keyof T, keyof O>>;
