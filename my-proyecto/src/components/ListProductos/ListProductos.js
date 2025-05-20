import React, { useState } from "react";
import { Table, Button, Image, FormControl } from "react-bootstrap";
import "./ListProductos.scss";

const ListProductos = ({ productos, onDelete, onUpdate }) => {
  const [editandoId, setEditandoId] = useState(null);
  const [formData, setFormData] = useState({});

  const manejarEditar = (producto) => {
    setEditandoId(producto._id);
    setFormData({
      nombre: producto.nombre,
      precio: producto.precio,
      clasificacion: producto.clasificacion,
      plataforma: producto.plataforma,
    });
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const manejarGuardar = (id) => {
    if (typeof onUpdate === "function") {
      onUpdate(id, formData);
    }
    setEditandoId(null);
  };

  const manejarCancelar = () => {
    setEditandoId(null);
  };

  return (
    <Table striped bordered hover responsive className="list-productos__table">
      <thead className="list-productos__thead">
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Clasificación</th>
          <th>Plataforma</th>
          <th>Imagen</th>
          <th>Eliminar</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody className="list-productos__tbody">
        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map((producto, index) => {
            const imageUrl = producto.imagep
              ? producto.imagep.startsWith("http")
                ? producto.imagep
                : `http://localhost:4000/uploads/${producto.imagep}`
              : null;

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
                      type="text"
                      name="clasificacion"
                      value={formData.clasificacion}
                      onChange={manejarCambio}
                    />
                  ) : (
                    producto.clasificacion
                  )}
                </td>
                <td>
                  {estaEditando ? (
                    <FormControl
                      type="text"
                      name="plataforma"
                      value={formData.plataforma}
                      onChange={manejarCambio}
                    />
                  ) : (
                    producto.plataforma
                  )}
                </td>
                <td>
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={producto.nombre}
                      fluid
                      className="list-productos__imagen"
                    />
                  ) : (
                    <span className="list-productos__sin-imagen">
                      Sin imagen
                    </span>
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
            <td colSpan="8" className="text-center">
              No hay productos disponibles.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default ListProductos;
