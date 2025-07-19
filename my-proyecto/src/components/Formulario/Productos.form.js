import * as YUP from "yup";

export function initialValues() {
  return {
    nombre: "",
    precio: "",
    cantidad: "",
    imagen: "",       // Para vista previa
    imagenFile: null  // Para archivo real
  };
}

export function validationSchema() {
  return YUP.object({
    nombre: YUP.string()
      .required("El nombre es obligatorio"),

    precio: YUP.number()
      .transform((value, originalValue) => {
        if (typeof originalValue === "string") {
          const cleaned = originalValue.replace(/[^0-9.]/g, "");
          return parseFloat(cleaned);
        }
        return value;
      })
      .typeError("El precio debe ser un número válido")
      .required("El precio es obligatorio")
      .positive("El precio debe ser mayor a cero"),

    cantidad: YUP.number()
      .typeError("La cantidad debe ser un número válido")
      .required("La cantidad es obligatoria")
      .integer("La cantidad debe ser un número entero")
      .min(1, "La cantidad debe ser al menos 1"),

    imagen: YUP.string() // opcional
  });
}
