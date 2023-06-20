import { Request, Response } from "express"
import { TUsers } from "../types/types"
import { users } from "../database/database"

export const createNewUser = (req: Request, res: Response): void => {

    try {
        const { id, name, email, password } = req.body
        const newUser: TUsers = {
            id,
            name,
            email,
            password,
            createAt: new Date().toISOString()
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
        if (typeof (email) === "string") {
            if (!email.match("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$")) {
                res.status(422)
                throw new Error("Incorrect email format. Try again.")
            }
        } else {
            res.status(422)
            throw new Error("Invalid information type, email must be a string. Try again.")
        }

        const checkId = users.find((user) => user.id === id)
        const checkEmail = users.find((user) => user.email === email)

        if (checkId) {
            res.status(400)
            throw new Error("This ID is already in use, use another.")
        }
        if (checkEmail) {
            res.status(400)
            throw new Error("This Email is already in use, use another.")
        }
        users.push(newUser)
        res.status(201).send("New user successfully registered.")
    } catch (error) {
        if(error instanceof Error){
            res.send(error.message)
        }else {
            res.send("Unknown error.")
        }
    }

}