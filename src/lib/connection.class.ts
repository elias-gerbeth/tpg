import { Client, ConnectionConfig } from 'pg';

export class DbConnection {
    private clientInstance: Client;
    private constructor() { }

    public async connect(options: ConnectionConfig): Promise<void> {
        this.clientInstance = new Client(options);
        await this.clientInstance.connect();
    }

    public get client(): DbConnection {
        return this.client;
    }
}