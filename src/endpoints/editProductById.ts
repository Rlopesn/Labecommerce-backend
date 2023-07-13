import { Request, Response } from "express"
import { db } from "../database/knex";

export const editProductById = async (req: Request, res: Response) => {

    try {
        const idToEdit = req.params.id;
        const { name, price, description, imageUrl } = req.body;
        if (name && typeof name !== "string") {
            res.status(422);
            throw new Error("The name must be a string.");
        }
        if (name && name.length < 2) {
            res.status(400);
            throw new Error("The name must be at least three characters long.");
        }
        if (price && typeof price !== "number") {
            res.status(422);
            throw new Error("The price must be a number.");
        }
        if (description && typeof description !== "string") {
            res.status(422);
            throw new Error("The description must be a string.");
        }
        if (imageUrl && typeof imageUrl !== "string") {
            res.status(422);
            throw new Error("The imageUrl must be a string.");
        }
        const [product] = await db("products").where({ id: idToEdit })
        if (product) {
            const updateProduct = {
                name: name || product.name,
                price: price || product.price,
                description: description || product.description,
                imageUrl: imageUrl || product.imageUrl
            }
            await db("products").update(updateProduct).where({ id: idToEdit })
        } else {
            res.status(404)
            throw new Error("product not found.");
        }
        res.status(200).send("Product changed successfully.");
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Unknown error.");
        }
    }

}
