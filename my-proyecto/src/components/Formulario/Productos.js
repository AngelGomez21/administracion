import React, { useState, useEffect, useCallback } from "react";
import { useFormik } from "formik";
import { Button, Form, Row, Col, InputGroup } from "react-bootstrap";
import { initialValues, validationSchema } from "./Productos.form";
import { ListProductos } from "../ListProductos";
import { Producto } from "../../api";
import { useDropzone } from 'react-dropzone';
import { imagenes } from "../../Assets";

import "./Productos";

const ctrProducto = new Producto();

export function Productos() {
  const [productos, setProductos] = useState([]); // Estado para la lista de productos

  // Función para obtener los productos desde la base de datos
  const obtenerProductos = async () => {
    try {
      const listaPro = await ctrProducto.getProducto();
      setProductos(listaPro || []); // Si no hay productos, aseguramos que se establezca un arreglo vacío
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  // Cargar productos al montar el componente
  useEffect(() => {
    obtenerProductos();
  }, []);

  // Configuración de Formik para manejar el formulario
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue, { resetForm }) => {
      try {
        const response = await ctrProducto.createProduct(formValue); // Agrega el producto a la base de datos
        setProductos([...productos, response]); // Actualiza la lista de productos en el estado
        alert("Producto agregado con éxito"); // Mensaje de éxito
        resetForm(); // Limpia el formulario
      } catch (error) {
        console.error("Error al agregar el producto:", error);
        alert("Hubo un error al agregar el producto");
      }
    },
  });

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {  // Asegurarse de que acceptedFiles tenga contenido
      const file = acceptedFiles[0];
      formik.setFieldValue("imagen", URL.createObjectURL(file));  // Asigna la URL de la imagen
      formik.setFieldValue("imagenFile", file);  // Guarda el archivo en formik para su posible uso
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png, image/jpg",
    onDrop,
  });

  const getImagen = () => {
    if (formik.values.imagenFile) {
      return formik.values.imagen;  // Si hay una imagen subida, usar la URL generada
    }
    return imagenes.noAvatar;  // Si no, mostrar una imagen por defecto
  };

  return (
    <div className="p-4">
      {/* Formulario para agregar productos */}
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom01">
            <Form.Label>Nombre del producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Producto"
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
          <Form.Group as={Col} md="3" controlId="validationCustom02">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              required
              type="number"
              name="precio"
              placeholder="Precio"
              value={formik.values.precio}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.precio}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.precio}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustomUsername">
            <Form.Label>Cantidad</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="number"
                name="cantidad"
                placeholder="Cantidad"
                value={formik.values.cantidad}
                onChange={formik.handleChange}
                isInvalid={!!formik.errors.cantidad}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.cantidad}
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Unidad</Form.Label>
            <Form.Control
              type="text"
              name="unidad"
              placeholder="Unidad"
              value={formik.values.unidad}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.unidad}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.unidad}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3">
            <Form.Label>Imagen</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              onChange={(e) =>
                formik.setFieldValue("imagen", e.currentTarget.files[0])  // Asegura que se suba una imagen válida
              }
              isInvalid={!!formik.errors.imagen}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.imagen}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row>
          <div className="form-imagen" {...getRootProps()}>
            <input {...getInputProps()} />
            <img src={getImagen()} alt="Imagen del producto" className="rounded-circle" />
          </div>
        </Row>

        <Button type="submit">Enviar</Button>
      </Form>

      {/* Tabla de productos */}
      <Row className="mt-4">
        <ListProductos productos={productos} />
      </Row>
    </div>
  );
}
