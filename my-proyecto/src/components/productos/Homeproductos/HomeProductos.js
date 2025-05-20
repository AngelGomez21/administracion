import React, { useState, useEffect } from "react";
import { Tabs, Tab, Row, Col } from "react-bootstrap";
import { ItemProductos } from "../ItemProductos";
import { Producto } from "../../../api";
import './HomeProducto.scss';

const ctrProducto = new Producto();

export function HomeProductos() {
  const [productos, setProductos] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [isTabOpen, setIsTabOpen] = useState(true); // Control de expansión

  const obtenerProductos = async () => {
    try {
      const lista = await ctrProducto.getProducto();
      setProductos(lista || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const fondo = {
    tema: {
      backgroundColor: "#111",
      color: "#00ffee",
      fontSize: "20px",
    },
  };

  const handleTabClick = (tabKey) => {
    if (activeTab === tabKey) {
      // Si es el mismo tab, alternar abierto/cerrado
      setIsTabOpen(!isTabOpen);
    } else {
      // Cambiar de tab y asegurar que esté abierto
      setActiveTab(tabKey);
      setIsTabOpen(true);
    }
  };

  return (
    <div className="container" style={fondo.tema}>
      <Tabs
        activeKey={activeTab}
        onSelect={handleTabClick}
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Lista de Productos">
          {isTabOpen && (
            <Row xs={1} sm={2} md={3} lg={4}>
              {productos.map((producto, index) => (
                <Col key={producto._id || index}>
                  <div className="p-2">
                    <ItemProductos producto={producto} />
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default HomeProductos;
