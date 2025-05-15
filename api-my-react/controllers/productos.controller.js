const Producto = require("../models/producto.models");
const image = require("../utils/image");

async function createProducto(req, res) {
  const productos = new Producto(req.body);

  try {
    // Validamos si se está enviando un archivo de imagen
    if (req.files && req.files.imagep) {
      const imagePath = image.getFilePath(req.files.imagep);
      productos.imagep = imagePath;
    }

    // Guardamos el producto
    const datos = await productos.save();
    res.status(200).send(datos);  // Enviamos el producto guardado como respuesta
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error al guardar los datos" });
  }
}

async function getProducto(req, res) {
  try {
    const buscarProductos = await Producto.find();
    res.status(200).send(buscarProductos);  // Retornamos los productos encontrados
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "Error al obtener la información" });
  }
}

async function delProducto(req, res) {
  const { id } = req.params;  // Obtenemos el ID del producto a eliminar

  try {
    const productoEliminado = await Producto.findByIdAndDelete(id);
    if (!productoEliminado) {
      return res.status(404).send({ msg: "Producto no encontrado" });
    }
    res.status(200).send({ msg: "Producto eliminado correctamente" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "No se ha podido eliminar el producto" });
  }
}

async function updateProducto(req, res) {
  const { id } = req.params;  // Obtenemos el ID del producto a actualizar
  const updateproducto = req.body;

  try {
    // Actualizamos el producto
    const productoActualizado = await Producto.findByIdAndUpdate({ _id: id }, updateproducto, { new: true });
    if (!productoActualizado) {
      return res.status(404).send({ msg: "Producto no encontrado" });
    }
    res.status(200).send({ msg: "Producto actualizado correctamente", producto: productoActualizado });
  } catch (error) {
    console.log(error);
    res.status(400).send({ msg: "Error al actualizar el producto" });
  }
}

module.exports = {
  createProducto,
  getProducto,
  delProducto,
  updateProducto,
};
