const express = require("express");
const cors = require("cors");
const path = require("path");
const productosRoutes = require("./routes/Producto.routes");

const app = express();

// Importante: Debe ir antes de las rutas API para que las imágenes se sirvan correctamente
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api", productosRoutes);

module.exports = app;
