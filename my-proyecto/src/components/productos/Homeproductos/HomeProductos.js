import React, { useState, useEffect } from "react";
import { Tabs, Tab, Row, Col, FormControl } from "react-bootstrap";
import { ItemProductos } from "../ItemProductos";
import { Producto } from "../../../api";
import './HomeProducto.scss';

const ctrProducto = new Producto();

export function HomeProductos() {
  const [productos, setProductos] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [isTabOpen, setIsTabOpen] = useState(true);
  const [busqueda, setBusqueda] = useState("");

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
      setIsTabOpen(!isTabOpen);
    } else {
      setActiveTab(tabKey);
      setIsTabOpen(true);
    }
  };

  // Filtrar productos solo por nombre
  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

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
            <>
              <FormControl
                type="search"
                placeholder="Buscar por nombre..."
                className="mb-3"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />

              <Row xs={1} sm={2} md={3} lg={4}>
                {productosFiltrados.map((producto, index) => (
                  <Col key={producto._id || index}>
                    <div className="p-2">
                      <ItemProductos producto={producto} />
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}

export default HomeProductos;
