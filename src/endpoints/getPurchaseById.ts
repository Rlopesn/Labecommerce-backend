import { Request, Response } from "express";
import { db } from "../database/knex";

export const getPurchaseById = async (req: Request, res: Response) => {
    try {
        const id = req.query.id;
        if (id !== undefined) {
            if (typeof id !== "string") {
                res.status(400);
                throw new Error("The value has to be a string");
            }
            const [Id] = await db.raw(`SELECT * FROM purchases
                WHERE id = "${id}"   
            `);
            if (Id) {
                res.status(200).send(Id);
            }
        }
        const result = await db.raw(`SELECT * FROM purchases;`);
        res.status(200).send(result);
    } catch (error) {
        if (req.statusCode === 200) {
            res.status(500);
        }
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Unknown error");
        }
    }
};