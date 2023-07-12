import { Request, Response } from "express"
import { TPurchases } from "../types/types"
import { db } from "../database/knex";



export const createNewPurchase = async (req: Request, res: Response) => {
    try {
        const { id, buyer, total_price } = req.body
        const newPurchase: TPurchases = {
            id,
            buyer,
            total_price,
            createdAt: new Date().toISOString()
        };
        if (typeof (id) === "string") {
            if (id[0] !== "p" || id[1] !== "u" || id[2] !== "r") {
                res.status(422)
                throw new Error("Invalid information, id value must start with 'pur'. Try again.")
            }
        } else {
            res.status(422)
            throw new Error("Invalid information, ID must be a valid string. Try again.")
        }
        if (typeof (buyer) === "string") {
            if (buyer[0] !== "u") {
                res.status(400);
                throw new Error("Buyer must start with character 'u'")
            }
        }
        if (total_price && typeof total_price !== "number") {
            res.status(400);
            throw new Error("The 'total_price' must be a number")
        }
        const purchasesWithId = await db("purchases").where("id", id).first();
        if (purchasesWithId) {
            res.status(400).send("This ID is already in use, use another.");
            return;
        }
        await db("purchases").insert(newPurchase)
        res.status(201).send("New purchase successfully registered.")
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