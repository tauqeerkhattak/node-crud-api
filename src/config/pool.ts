import {createPool, Pool} from "mysql";

export class DB {
    private static pool: Pool;

    static getPool(): Pool {
        if (DB.pool == null) {
            console.log(`ENV: ${process.env.DB_PORT}`);
            DB.pool = createPool({
                port: Number.parseInt(process.env.DB_PORT!),
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                connectionLimit: 0,
                multipleStatements: true,
            });
            return DB.pool;
        }
        else {
            return DB.pool;
        }
    }
}