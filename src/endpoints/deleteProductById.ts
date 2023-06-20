import { Request, Response } from "express"
import { products } from "../database/database"

export const deleteProductById = (req: Request, res: Response): void => {

    try {
        const id = req.params.id;
        const findProductsIdex = products.findIndex((product) => {
            return product.id === id;
        });
        if (findProductsIdex >= 0) {
            products.splice(findProductsIdex, 1);
            res.status(200).send("Successfully deleted product.");
        }
        res.status(400).send("Product not found.");
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message);
        } else {
            res.status(500).send("Unknown error.");
        }
    }
}
