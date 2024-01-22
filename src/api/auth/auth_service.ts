import {query} from "../../config/database";
import {UserResponse} from "../../models/user_response";
import {GenericResponse} from "../../models/generic_response";

export async function doesUsernameExist(username: string): Promise<boolean> {
    try {
        const data = await query("SELECT * FROM users WHERE username = ?", [username]);
        console.log(`LENGTH: ${data.length}`);
        return data.length > 0;
    } catch (e) {
        console.log("Exception: ", e);
        return false;
    }
}

export async function createUser(params: {
    email: string,
    username: string,
    password: string,
    firstName: string,
    lastName: string,
}): Promise<GenericResponse> {
    try {
        const sql: string = "INSERT INTO users (email, password, firstName, lastName, username) VALUES (?, ?, ?, ?, ?)";
        const results = await query(sql, [
            params.email,
            params.password,
            params.firstName,
            params.lastName,
            params.username,
        ]);
        return new UserResponse(
            200,
            true,
            "User created successfully!",
            params.email,
            params.firstName,
            params.lastName,
            params.username,
        );
    } catch (e: any) {
        return new GenericResponse(200, false, e.toString());
    }
}