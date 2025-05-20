const path = require("path");
const Producto = require("../models/producto.models");

async function createProducto(req, res) {
  try {
    const { nombre, precio, clasificacion, plataforma } = req.body;

    if (!nombre || !precio || !clasificacion || !plataforma) {
      return res.status(400).send({ msg: "Faltan campos obligatorios" });
    }

    // Aquí extraemos el nombre del archivo si existe la imagen
    const imageName = req.files && req.files.imagep ? path.basename(req.files.imagep.path) : "";

    const productos = new Producto({
      nombre,
      precio,
      clasificacion,
      plataforma,
      imagep: imageName,
    });

    const datos = await productos.save();
    res.status(200).send(datos);
  } catch (error) {
    console.error("Error en createProducto:", error);
    res.status(500).send({ msg: "Error al guardar los datos", error: error.message });
  }
}

async function getProducto(req, res) {
  try {
    const buscarProductos = await Producto.find();
    res.status(200).send(buscarProductos);
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "Error al obtener la información" });
  }
}

async function delProducto(req, res) {
  const { id } = req.params;

  try {
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).send({ msg: "Producto no encontrado" });
    }
    res.status(200).send({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: "No se ha podido eliminar el producto" });
  }
}

async function updateProducto(req, res) {
  const { id } = req.params;
  const updateproducto = req.body;

  if (req.files && req.files.imagep) {
    const imageName = path.basename(req.files.imagep.path);
    updateproducto.imagep = imageName;
  }

  try {
    const productoActualizado = await Producto.findByIdAndUpdate(id, updateproducto, { new: true });
    if (!productoActualizado) {
      return res.status(404).send({ msg: "Producto no encontrado" });
    }
    res.status(200).send({
      msg: "Producto actualizado correctamente",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).send({ msg: "Error al actualizar el producto" });
  }
}

module.exports = {
  createProducto,
  getProducto,
  delProducto,
  updateProducto,
};
