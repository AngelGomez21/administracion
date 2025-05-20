const mongoose = require("mongoose");

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: [true, "El nombre es obligatorio"] },
  precio: { type: String, required: [true, "El precio es obligatorio"] },
  clasificacion: { type: String, required: [true, "La clasificación es obligatoria"] },
  plataforma: { type: String, required: [true, "La plataforma es obligatoria"] },
  imagep: { type: String, default: "" },
});

module.exports = mongoose.model("Producto", ProductoSchema);
