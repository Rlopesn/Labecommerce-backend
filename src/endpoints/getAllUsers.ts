import { Request, Response } from "express"
import { db } from "../database/knex"

export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const result = await db.raw(`
                SELECT * FROM users;
            `)
        res.status(200).send(result)

    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Unknown error.")
        }
    }
}