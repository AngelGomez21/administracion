import React, { useEffect, useState } from 'react';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import './Menu.scss';

export function Menu() {
  const location = useLocation();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Activa la animación al cambiar de ruta
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 10); // pequeño delay para reiniciar animación

    return () => clearTimeout(timeout);
  }, [location]);

  return (
    <Navbar expand="lg" className={`navbar-custom ${animate ? 'fade-slide' : ''}`}>
      <Container>
        <Navbar.Brand as={Link} to="/">Barra de Herramientas</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" className="home">Home</Nav.Link>
          <Nav.Link as={Link} to="/producto" className="productos">Productos</Nav.Link>
          <Nav.Link as={Link} to="/formproductos" className="gestion">Gestión de productos</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
