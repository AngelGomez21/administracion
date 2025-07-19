import React from "react";
import { Card } from "react-bootstrap";
import "./ItemProductos.scss";

export function ItemProductos({ producto }) {
  return (
    <Card>
      {producto.imagep ? (
        <Card.Img
          variant="top"
          src={`http://localhost:5000/uploads/${producto.imagep}`}
          alt={producto.nombre}
          style={{ maxHeight: "180px", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            height: "180px",
            backgroundColor: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
          }}
        >
          Sin imagen
        </div>
      )}
      <Card.Body className="body">
        <Card.Title className="body__title">{producto.nombre}</Card.Title>
        <Card.Text className="body__text">
          <strong>Precio:</strong> {producto.precio}
          <br />
          <strong>Cantidad:</strong> {producto.cantidad}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
