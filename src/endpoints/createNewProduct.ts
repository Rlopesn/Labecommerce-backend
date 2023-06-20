import { Request, Response } from "express"
import { TProducts } from "../types/types"
import { products } from "../database/database"

export const createNewProduct = (req: Request, res: Response): void => {
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
        const checkId = products.find((product) => product.id === id)
        if (checkId) {
            res.status(400)
            throw new Error("This ID is already in use, use another.")
        }
        products.push(newProduct)
        res.status(201).send("New product successfully registered.")
    } catch (error) {
        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Unknown error.")
        }
    }
}