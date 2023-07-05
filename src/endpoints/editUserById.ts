import { Request, Response } from "express"
import { users } from "../database/database"

export const editUserById = (req: Request, res: Response) => {

    try {
        const id = req.params.id;
        const { name, email, password } = req.body;
        const findUsers = users.find((user) => {
            return user.id === id;
        });
        if (name && typeof name !== "string") {
            res.status(422);
            throw new Error("The name must be a string.");
        }
        if (name && name.length < 3) {
            res.status(400);
            throw new Error("The name must be at least three characters long.");
        }
        if (email && !email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
            res.status(400);
            throw new Error("Incorrect email format. Try again.");
        }
        if (password && !password.match("^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$")) {
            res.status(400);
            throw new Error("Your password must be between 6 and 15 characters, with both uppercase and lowercase letters, and at least one number and one special character."
            );
        }
        if (findUsers) {
            findUsers.name = name || findUsers.name;
            findUsers.email = email || findUsers.email;
            findUsers.password = password || findUsers.password;
            res.status(200).send("User Changed Successfully.");
        } else {
            res.status(400).send("User not found.");
        }
         
        

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Unknown error.");
        }
    }
}