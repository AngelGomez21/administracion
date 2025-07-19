import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import {
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Modal
} from "react-bootstrap";
import { initialValues, validationSchema } from "./Productos.form";
import ListProductos from "../ListProductos/ListProductos";
import { Producto } from "../../api";
import { useDropzone } from "react-dropzone";
import { imagenes } from "../../Assets";

import "./Productos.scss";

const ctrProducto = new Producto();

export function Productos() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const obtenerProductos = async () => {
    try {
      const listaPro = await ctrProducto.getProducto();
      setProductos(listaPro || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  const eliminarProducto = async (id) => {
    try {
      await ctrProducto.delProducto(id);
      await obtenerProductos();
      alert("Producto eliminado con éxito");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("Hubo un error al eliminar el producto");
    }
  };

  const actualizarProducto = async (id, datosActualizados) => {
    try {
      await ctrProducto.updateProducto(id, datosActualizados);
      await obtenerProductos();
      alert("Producto actualizado con éxito");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      alert("Hubo un error al actualizar el producto");
    }
  };

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("nombre", formValue.nombre);
        formData.append("precio", formValue.precio);
        formData.append("cantidad", formValue.cantidad);

        if (formValue.imagenFile) {
          formData.append("imagep", formValue.imagenFile);
        }

        await ctrProducto.createProducto(formData);
        await obtenerProductos();
        alert("Producto agregado con éxito");
        resetForm();
        setShowModal(false);
      } catch (error) {
        console.error("Error al agregar el producto:", error);
        alert("Hubo un error al agregar el producto");
      }
    },
  });

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      formik.setFieldValue("imagen", URL.createObjectURL(file));
      formik.setFieldValue("imagenFile", file);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop,
  });

  useEffect(() => {
    return () => {
      if (formik.values.imagen) {
        URL.revokeObjectURL(formik.values.imagen);
      }
    };
  }, [formik.values.imagen]);

  const getImagen = () => {
    return formik.values.imagen || imagenes.noAvatar;
  };

  return (
    <div className="p-4">
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Agregar producto
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Agregar nuevo producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={formik.handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="12" controlId="validationCustom01">
                <Form.Label>Nombre del Producto</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nombre del Producto"
                  name="nombre"
                  onChange={formik.handleChange}
                  value={formik.values.nombre}
                  isInvalid={!!formik.errors.nombre}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.nombre}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="6">
                <Form.Label>Precio</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    name="precio"
                    placeholder="Precio"
                    value={formik.values.precio}
                    onChange={formik.handleChange}
                    isInvalid={!!formik.errors.precio}
                    min="0"
                    step="0.01"
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.precio}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="6">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  name="cantidad"
                  placeholder="Cantidad"
                  value={formik.values.cantidad}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.cantidad}
                  min="1"
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.cantidad}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="12">
                <Form.Label>Imagen</Form.Label>
                <Form.Control
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.currentTarget.files[0];
                    if (file) {
                      formik.setFieldValue("imagen", URL.createObjectURL(file));
                      formik.setFieldValue("imagenFile", file);
                    }
                  }}
                  isInvalid={!!formik.errors.imagen}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.imagen}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3 justify-content-center">
              <div className="form-imagen" {...getRootProps()}>
                <input {...getInputProps()} />
                <img
                  src={getImagen()}
                  alt="Imagen del juego"
                  className="rounded-circle"
                  style={{ width: 100, height: 100, objectFit: "cover" }}
                />
              </div>
            </Row>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                Cancelar
              </Button>
              <Button type="submit" variant="primary">
                Guardar
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Row className="mt-4">
        <ListProductos
          productos={productos}
          onDelete={eliminarProducto}
          onUpdate={actualizarProducto}
        />
      </Row>
    </div>
  );
}

export default Productos;
