import { TSType } from './query-builder/types';

export interface TableOptions { name?: string; }
export function Table(options?: TableOptions): ClassDecorator {
    return target => { };
}
