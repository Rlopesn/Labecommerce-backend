import express, { Request, Response } from 'express'
import cors from 'cors'
import { products, users } from "./database/database";
import { TProducts, TUsers } from './types/types';
import { getAllProducts } from './endpoints/getAllProducts';
import { getAllUsers } from './endpoints/getAllUsers';
import { createNewUser } from './endpoints/createNewUser';
import { createNewProduct } from './endpoints/createNewProduct';
import { deleteUserById } from './endpoints/deleteUserById';
import { deleteProductById } from './endpoints/deleteProductById';
import { editUserById } from './endpoints/editUserById';
import { editProductById } from './endpoints/editProductById';


const app = express()
app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
})

app.get("/ping", (req: Request, res: Response) => {
    res.send("Pong")
})

app.get("/users", getAllUsers)

app.get("/products", getAllProducts)

app.post("/users", createNewUser)

app.post("/products", createNewProduct)

app.delete("/users/:id", deleteUserById);

app.delete("/products/:id", deleteProductById);

app.put("/users/:id", editUserById);

app.put("/products/:id", editProductById);