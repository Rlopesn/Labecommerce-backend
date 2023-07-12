import { Request, Response } from "express"
import { db } from "../database/knex";

export const editUserById = async (req: Request, res: Response) => {

    try {
        const idToEdit = req.params.id;
        const { name, email, password } = req.body;

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
        const [user] = await db("users").where({ id: idToEdit })
        if (user) {
            const updateUser = {
                name: name || user.name,
                email: email || user.email,
                password: password || user.password
            }
            await db("users").update(updateUser).where({ id: idToEdit })
        } else {
            res.status(404)
            throw new Error("User not found.");
        }
        res.status(200).send("User Changed Successfully.");
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Unknown error.");
        }
    }
}