import { Request, Response } from "express"
import { db } from "../database/knex";

export const deleteProductById = async (req: Request, res: Response) => {

    try {
        const idToDelete = req.params.id;
        const [product] = await db("products").where({ id: idToDelete })
        if (!product) {
            res.status(404)
            throw new Error("Id not found.")
        }
        await db("products").del().where({ id: idToDelete })
        res.status(200).send("Product deleted successfully.")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Unknown error.");
        }
    }
}
