import { Request, Response } from "express"
import { TUsers } from "../types/types"
import { db } from "../database/knex"

export const createNewUser = async (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body
        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createdAt: new Date().toISOString()
        }
        if (!id || !name || !email || !password) {
            res.status(400)
            throw new Error("Complete all fields to register the new user.")
        }
        if (typeof (id) === "string" && name.length > 0) {
            if (id[0] !== "u") {
                res.status(422)
                throw new Error("Invalid information, id value must start with 'u'. Try again.")
            }
        } else {
            res.status(422)
            throw new Error("Invalid information, ID must be a valid string. Try again.")
        }
        if (name && typeof name !== "string") {
            res.status(422);
            throw new Error("The name must be a string");
        }
        if (name && name.length < 3) {
            res.status(400);
            throw new Error("The name must be at least three characters long");
        }
        if (typeof (email) === "string") {
            if (!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")) {
                res.status(422)
                throw new Error("Incorrect email format. Try again.")
            }
        } else {
            res.status(422)
            throw new Error("Invalid information type, email must be a string. Try again.")
        }
        if (password && !password.match("^(?=.*[A-Z])(?=.*[!#@$%&])(?=.*[0-9])(?=.*[a-z]).{6,15}$")) {
            res.status(400);
            throw new Error("Your password must be between 6 and 15 characters, with both uppercase and lowercase letters, and at least one number and one special character.");
        }
        const userWithId = await db("users").where("id", id).first();
        const userWithEmail = await db("users").where("email", email).first();
        if (userWithId) {
            res.status(400).send("This ID is already in use, use another.");
            return;
        }
        if (userWithEmail) {
            res.status(400).send("This Email is already in use, use another.");
            return;
        }
        await db("users").insert(newUser)
        res.status(201).send("New user successfully registered.")

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unknown error.")
        }
    }

}