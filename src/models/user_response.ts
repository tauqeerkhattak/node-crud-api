import {GenericResponse} from "./generic_response";

export class UserResponse extends GenericResponse {
    public email: string;
    public firstName: string;
    public lastName: string;
    public username: string;

    constructor(
        status: number,
        success: boolean,
        message: string,
        email: string,
        firstName: string,
        lastName: string,
        username: string,
    ) {
        super(status, success, message);
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
    }
}