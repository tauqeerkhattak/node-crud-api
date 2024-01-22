import {Request, Response} from "express";
import {GenericResponse} from "../../models/generic_response";
import {createUser, doesUsernameExist} from "./auth_service";
import {query} from "../../config/database";
import {UserResponse} from "../../models/user_response";

export async function signUp(req: Request, res: Response): Promise<void> {
    try {
        const email = req.body['email'];
        const password: string = req.body['password'];
        const firstName: string = req.body['firstName'];
        const lastName: string = req.body['lastName'];
        const username: string = req.body['username'];
        if (email == null || password == null || firstName == null || lastName == null || username == null) {
            res.status(200).json(
                new GenericResponse(
                    200,
                    false,
                    "Data provided is null!",
                ),
            );
            return;
        }
        const doesUserExist = await doesUsernameExist(username);
        if (doesUserExist) {
            res.status(200).json(
                new GenericResponse(
                    200,
                    true,
                    "User already exists with username: " + username,
                ),
            );
        }
        else {
            const response = await createUser({
                username: username,
                email: email,
                firstName: firstName,
                lastName: lastName,
                password: password,
            });
            res.status(200).send(
                response,
            );
        }
    } catch (e: any) {
        console.log("Exception", e);
        res.status(200).send(
          new GenericResponse(
              200,
              false,
              e.toString(),
          ),
        );
    }
}

export async function login(req: Request, res: Response): Promise<void> {
    try {
        const username: string = req.body['username'];
        const password: string = req.body['password'];
        if (username == null || password == null) {
            res.status(200).send(
                new GenericResponse(
                    200,
                    false,
                    "Username or password is incorrect!",
                ),
            );
        }
        else {
            const sql: string = "SELECT * FROM users WHERE username = ? AND password = ?";
            const results: any = await query(sql, [username, password]);
            const user = results[0];
            if (user == null) {
                res.send(
                    new GenericResponse(
                        200,
                        false,
                        "Invalid credentials or user does not exist!"
                    ),
                );
            }
            else {
                res.send(
                    new UserResponse(
                        200,
                        true,
                        "User fetched!",
                        user.email,
                        user.firstName,
                        user.lastName,
                        user.username,
                    ),
                );
            }
        }
    } catch (e: any) {
        console.log("Exception: ", e);
        res.status(200).send(
            new GenericResponse(
                200,
                false,
                e.toString(),
            ),
        );
    }
}