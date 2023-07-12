import { Request, Response } from "express";
import { db } from "../database/knex";


export const deletePurchaseById = async (req: Request, res: Response) => {
    try {
        const idToDelete = req.params.id;
        const [purchase] = await db("purchases").where({ id: idToDelete })
        if (!purchase) {
            res.status(404)
            throw new Error("Id not found.")
        }
        await db("purchases").del().where({ id: idToDelete })
        res.status(200).send("purchase deleted successfully.")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Unknown error.");
        }
    }
}