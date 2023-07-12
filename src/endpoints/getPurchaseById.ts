import { Request, Response } from "express";
import { db } from "../database/knex";

export const getPurchaseById = async (req: Request, res: Response) => {
    try {
        const idToSearch = req.params.id;

       /*  if (idToSearch === "id") {
            throw new Error("Need to pass an ID.")
        } */

        const [purchase] = await db("purchases").where( "purchases.id", idToSearch )
        if (!purchase) {
            res.status(404)
            throw new Error("ID not found.")
        }

        const lista = await db("purchases_products").where({ purchase_id: idToSearch })

        const prodList = []

        for (let product of lista) {
            const [prod] = await db("products").where({
                id: product.product_id
            })
            prodList.push(prod)
        }

        const user = await db("users").where({ id: idToSearch })


        const result = {
            products: prodList,
            purchase_id: purchase.id
        }

        console.log(user);


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