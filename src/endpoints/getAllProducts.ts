import { Request, Response } from "express"
import { db } from "../database/knex"

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const name = req.query.name
        if (name !== undefined) {
            if (typeof name !== "string") {
                res.status(422)
                throw new Error("The value has to be a string.")
            }
            if (!name || name.length < 1) {
                res.status(400)
                throw new Error("The name must contain at least one letter.")
            }
            const response = await db("products").where("name", "LIKE", `%${name}%`)
            res.status(200).send(response);
        }
        const result = await db("products")
        res.status(200).send(result)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Unknown error.")
        }
    }
}
