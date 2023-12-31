import { Router } from "express";
import { Product, ProductManager } from "../../dao/ProductManager-DB.js";
import productModel from "../../models/products.model.js";


const router = Router();

router.get("/products", async (req, res) => {
    try {
        const products = await ProductManager.getProducts();
        console.log(products)
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
});

router.get("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await ProductManager.getProductById(pid);
        if (!product) return res.status(404).json({ "Error": `Producto id #${pid} no encontrado ⛔` });
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.get("/productByCode/:pid", async (req, res) => {
    const { pid } = req.params;
    try {
        const product = await ProductManager.getProductByCode(pid);
        if (!product) return res.status(404).json({ "Error": `Producto código #${pid} no encontrado ⛔` });
        return res.status(200).json(product);
    } catch (error) {
        return res.status(500).json({ error });
    }
});

router.post("/products", async (req, res) => {
    const { body } = req;
    const { title, description, price, code, stock } = body;
    if (!title || !description || !price || !code || !stock) {
        return res.status(400).json({
            "⛔Error:":
                "Producto recibido no es válido. Propiedades vacías o sin definir ⛔"
        });
    } else {
        try {
            const prod1 = new Product(title, description, price, code, stock);
            const result = await ProductManager.addProduct(prod1);
            result !== -1 ? res.status(201).json(result) : res.status(400).json({
                "⛔Error:":
                    "Producto ya existente en la Base de Datos"
            });
        } catch (error) {
            return res.status(500).json({ error });
        }
    }
});

router.put("/products/:pid", async (req, res) => {
    const { pid } = req.params
    const { body } = req;
    if (pid) {
        try {
            const currentProduct = await productModel.find({ _id: pid });
            if (!body.title || !body.description || !body.price || !body.code || !body.stock) {
                return res.status(400).json({
                    "⛔Error:":
                        "Producto recibido no es válido. Propiedades vacías o sin definir ⛔"
                });
            } else {
                const result = await ProductManager.updateProduct(pid, body);
                result ? res.status(204).end() :
                    res.status(500).json({ "⛔Error:": "No se pudo actualizar el producto" });

            }
        } catch {
            return res.status(404).json({ "⛔Error:": "Producto ID#" + pid + " no existe en la BD ⛔" });
        }
    }
    else {
        return res.status(400).json({ "⛔Error:": "id recibido de Producto no es válido ⛔" });
    }
});

router.delete("/products/:pid", async (req, res) => {
    const { pid } = req.params;
    if (pid) {
        const result = await ProductManager.deleteProduct(pid);
        result ? res.status(200).json({ "✅Producto Eliminado: ": pid }) :
            res.status(404).json({ "⛔Error": `Producto id #${pid} no encontrado ⛔` });
    } else {
        res.status(400).json({ "⛔Error:": "id recibido de Producto no es válido ⛔" });
    }
});

export { router };