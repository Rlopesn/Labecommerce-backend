import { Request, Response } from "express"
import { products } from "../database/database"

export const getAllProducts = (req: Request, res: Response): void => {
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
            const response = products.filter((product) => {
                return product.name.toLowerCase().includes(name.toLowerCase())
            })
            res.status(200).send(response)
        }
        res.status(200).send(products)
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.status(500).send("Unknown error.")
        }
    }
}