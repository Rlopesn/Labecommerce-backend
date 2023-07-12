import { Request, Response } from "express"
import { TProducts } from "../types/types"
import { db } from "../database/knex"

export const createNewProduct = async (req: Request, res: Response) => {
    try {

        const { id, name, price, description, imageUrl } = req.body

        const newProduct: TProducts = {
            id: id,
            name: name,
            price: price,
            description: description,
            imageUrl: imageUrl
        }
        if (!id || !name || !price || !description || !imageUrl) {
            res.status(400)
            throw new Error("Complete all fields to resgister the new product.")
        }
        if (typeof (id) === "string" && name.length > 0) {
            if (id[0] !== "p" || id[1] !== "r" || id[2] !== "o" || id[3] !== "d") {
                res.status(422)
                throw new Error("Invalid information, id value must start with 'prod'. Try again.")
            }
        } else {
            res.status(422)
            throw new Error("Invalid information, ID must be a valid string. Try again.")
        }
        if (price && typeof price !== "number") {
            res.status(422);
            throw new Error("The price must be a number");
        }
        if (description && typeof description !== "string") {
            res.status(422);
            throw new Error("The description must be a string");
        }
        if (imageUrl && typeof imageUrl !== "string") {
            res.status(422);
            throw new Error("The imageUrl must be a string");
        }
        const productWithId = await db("products").where("id", id).first();
        if (productWithId) {
            res.status(400).send("This ID is already in use, use another.");
            return;
        }
        await db("products").insert(newProduct)
        res.status(201).send("New product successfully registered.")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unknown error.")
        }
    }
}