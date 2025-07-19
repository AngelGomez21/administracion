import React, { useState, useEffect } from "react";
import { Table, Button, Image, FormControl } from "react-bootstrap";
import "./ListProductos.scss";

const ListProductos = ({ productos, onDelete, onUpdate }) => {
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});
  const [filtro, setFiltro] = useState("");

  // Guardar también una URL temporal para vista previa de la imagen
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (!editandoId) {
      // Limpiar vista previa cuando no se edita ningún producto
      setPreviewImage(null);
    }
  }, [editandoId]);

  const manejarEditar = (producto) => {
    setEditandoId(producto._id);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: producto.cantidad,
      imagenFile: null, // archivo nuevo para imagen si el usuario la cambia
      imagep: producto.imagep, // ruta actual para imagen
    });
    setPreviewImage(
      producto.imagep
        ? producto.imagep.startsWith("http")
          ? producto.imagep
          : `http://localhost:5000/uploads/${producto.imagep}`
        : null
    );
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Manejar cambio de imagen
  const manejarCambioImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        imagenFile: file,
      }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const manejarGuardar = (id) => {
    if (typeof onUpdate === "function") {
      // Preparamos datos a enviar: puede ser FormData si tienes que enviar imagen
      const datosAEnviar = new FormData();
      datosAEnviar.append("nombre", formData.nombre);
      datosAEnviar.append("precio", formData.precio);
      datosAEnviar.append("cantidad", formData.cantidad);

      if (formData.imagenFile) {
        datosAEnviar.append("imagep", formData.imagenFile);
      }

      // Pasar FormData directamente
      onUpdate(id, datosAEnviar);
    }
    setEditandoId(null);
    setPreviewImage(null);
  };

  const manejarCancelar = () => {
    setEditandoId(null);
    setPreviewImage(null);
  };

  // Filtrar productos solo por nombre
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <>
      <FormControl
        type="search"
        placeholder="Buscar por nombre"
        className="mb-3"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      <Table striped bordered hover responsive className="list-productos__table">
        <thead className="list-productos__thead">
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Imagen</th>
            <th>Eliminar</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody className="list-productos__tbody">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto, index) => {
              const estaEditando = editandoId === producto._id;

              return (
                <tr key={producto._id || index}>
                  <td>{index + 1}</td>
                  <td>
                    {estaEditando ? (
                      <FormControl
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={manejarCambio}
                      />
                    ) : (
                      producto.nombre
                    )}
                  </td>
                  <td>
                    {estaEditando ? (
                      <FormControl
                        type="number"
                        name="precio"
                        value={formData.precio}
                        onChange={manejarCambio}
                      />
                    ) : (
                      `$${producto.precio}`
                    )}
                  </td>
                  <td>
                    {estaEditando ? (
                      <FormControl
                        type="number"
                        name="cantidad"
                        value={formData.cantidad}
                        onChange={manejarCambio}
                      />
                    ) : (
                      producto.cantidad
                    )}
                  </td>
                  <td>
                    {estaEditando ? (
                      <>
                        <FormControl
                          type="file"
                          accept="image/*"
                          onChange={manejarCambioImagen}
                        />
                        {previewImage ? (
                          <Image
                            src={previewImage}
                            alt="Imagen previa"
                            fluid
                            thumbnail
                            style={{ maxHeight: "80px", marginTop: "5px" }}
                          />
                        ) : (
                          <span className="list-productos__sin-imagen">Sin imagen</span>
                        )}
                      </>
                    ) : producto.imagep ? (
                      <Image
                        src={
                          producto.imagep.startsWith("http")
                            ? producto.imagep
                            : `http://localhost:5000/uploads/${producto.imagep}`
                        }
                        alt={producto.nombre}
                        fluid
                        className="list-productos__imagen"
                      />
                    ) : (
                      <span className="list-productos__sin-imagen">Sin imagen</span>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => onDelete && onDelete(producto._id)}
                      disabled={estaEditando}
                      className="list-productos__boton"
                    >
                      Eliminar
                    </Button>
                  </td>
                  <td>
                    {estaEditando ? (
                      <>
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => manejarGuardar(producto._id)}
                          className="list-productos__boton"
                        >
                          Guardar
                        </Button>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={manejarCancelar}
                          className="list-productos__boton"
                        >
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <Button
                        variant="warning"
                        size="sm"
                        onClick={() => manejarEditar(producto)}
                        className="list-productos__boton"
                      >
                        Editar
                      </Button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No se encontraron productos.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default ListProductos;
