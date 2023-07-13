import { Request, Response } from "express"
import { TPurchases } from "../types/types"
import { db } from "../database/knex";



export const createNewPurchase = async (req: Request, res: Response) => {
    try {
        const { id, buyer, products } = req.body
        if (typeof (id) === "string") {
            if (id[0] !== "p" || id[1] !== "u" || id[2] !== "r") {
                res.status(422)
                throw new Error("Invalid information, id value must start with 'pur'. Try again.")
            }
        } else {
            res.status(422)
            throw new Error("Invalid information, ID must be a valid string. Try again.")
        }
        const [checkId] = await db("purchases").where({ id: id })
        if (checkId) {
            res.status(422)
            throw new Error("ID being used.")
        }
        if (typeof (buyer) === "string") {
            if (buyer[0] !== "u") {
                res.status(400);
                throw new Error("Buyer must start with character 'u'")
            }
        }
        const [checkBuyer] = await db("users").where({ id: buyer })
        if (!checkBuyer) {
            res.status(422)
            throw new Error("User not found.")
        }
        for (let product of products) {
            if (typeof (product.id) === 'string' && product.id.length > 0) {
                if (product.id.substring(0, 4) !== 'prod') {
                    res.status(422)
                    throw new Error("Id needs to start with 'prod'.")
                }
            }
            const [checkId] = await db("products").where({ id: product.id })
            if (!checkId) {
                res.status(422)
                throw new Error("The product does not exist.")
            }
            if (typeof product.quantity !== 'number' || product.quantity === 0) {
                res.status(422)
                throw new Error("Quantity must be greater than 0.")
            }

        }
        let total_price = 0
        for (let product of products) {
            try {
                const priceArr = await db('products').select('price').where({ id: product.id });

                const price = parseFloat(priceArr[0].price);

                if (!isNaN(price)) {
                    total_price += price * product.quantity
                } else {
                    res.status(400)
                    throw new Error("Can't access prices.")
                }
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
        }
        const newPurchase: TPurchases = {
            id: id,
            buyer: buyer,
            total_price: total_price
        }
        await db("purchases").insert(newPurchase)
        for (let product of products) {
            const newPurchaseProducts = {
                purchase_id: id,
                product_id: product.id,
                quantity: product.quantity
            }
            await db("purchases_products").insert(newPurchaseProducts)
        }
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