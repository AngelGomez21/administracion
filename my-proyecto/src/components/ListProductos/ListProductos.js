import React from "react";
import { Table, Button, Image } from "react-bootstrap";
import { ENV } from "../../utils";

const urlImagen = ENV.BASE_PATH;

export function ListProductos(props) {
  const { productos } = props;

  console.log("Productos recibidos:", productos); // Debug

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>Unidad</th>
          <th>Imagen</th>
          <th>Editar</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(productos) && productos.length > 0 ? (
          productos.map((producto, index) =>
            producto ? (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.unidad}</td>
                <td>
                  <Image src={urlImagen + producto.imagen} alt="Producto" fluid style={{ maxWidth: "100px" }} />
                </td>
                <td>
                  <Button variant="success">Editar</Button>
                </td>
                <td>
                  <Button variant="danger">Eliminar</Button>
                </td>
              </tr>
            ) : (
              <tr key={index}>
                <td colSpan="8">Producto no válido</td>
              </tr>
            )
          )
        ) : (
          <tr>
            <td colSpan="8">No hay productos disponibles.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
