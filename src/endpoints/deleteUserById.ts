import { Request, Response } from "express"
import { users } from "../database/database"

export const deleteUserById = (req: Request, res: Response): void => {

    try {
        const id = req.params.id;
        const findUsersIdex = users.findIndex((user) => {
            return user.id === id;
        });
        if (findUsersIdex >= 0) {
            users.splice(findUsersIdex, 1);
            res.status(200).send("User deleted successfully.");
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