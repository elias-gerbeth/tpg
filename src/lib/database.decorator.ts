
export interface DatabaseOptions { name?: string; }
export function Database(options?: DatabaseOptions): ClassDecorator {
    return target => { };
}
