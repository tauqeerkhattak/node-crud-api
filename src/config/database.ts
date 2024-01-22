import { FieldInfo} from "mysql";
import {DB} from "./pool";

export async function query(sql: string, args: any[]): Promise<any> {
    console.log(`QUERY: ${sql}`);
    return new Promise<FieldInfo[]>((resolve, reject) => {
        DB.getPool().getConnection((error, connection) => {
            if (error) {
                return reject(error.message);
            }
            connection.query(sql, args,(error, results, fields,) => {
                if (error) {
                    return reject(error.message);
                }
                else if ((results?.length ?? 0) > 0) {
                    return resolve(results ?? []);
                }
                else if (results['insertId']) {
                    return reject("No data exists!");
                }
                return resolve(results ?? []);
            });
        });
    });
}

