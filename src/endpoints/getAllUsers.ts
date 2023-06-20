import { Request, Response } from "express"
import { users } from "../database/database"

export const getAllUsers = (req: Request, res: Response): void => {
    try {
        const name = req.query.name
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(422)
                throw new Error("The name must be a string.")
            }
            if (name && name.length < 1) {
                throw new Error("The name must contain at least one letter.")
            }
            const response = users.filter((user) => {
                return user.name.toLowerCase().includes(name.toLowerCase())
            })
            res.status(200).send(response)
        }
        res.status(200).send(users)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Unknown error.")
        }
    }
}