const express = require("express");
const multiparty = require("connect-multiparty");
const path = require("path");

// Middleware para subir archivos, con carpeta uploads
const md_mparty = multiparty({ uploadDir: path.resolve(__dirname, "../uploads") });

const productosController = require("../controllers/productos.controller");

const api = express.Router();

// Rutas de producto
api.post("/createproducto", md_mparty, productosController.createProducto);
api.get("/getproducto", productosController.getProducto);
api.put("/updateproducto/:id", md_mparty, productosController.updateProducto);
 // ← corregido de PATCH a PUT
api.delete("/delproducto/:id", productosController.delProducto);

module.exports = api;
