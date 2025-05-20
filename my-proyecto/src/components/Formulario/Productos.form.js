import * as YUP from "yup";

export function initialValues() {
  return {
    nombre: "",
    precio: "",
    clasificacion: "",
    plataforma: "",
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

    clasificacion: YUP.string()
      .required("La clasificación es obligatoria"),

    plataforma: YUP.string()
      .required("La plataforma es obligatoria"),

    imagen: YUP.string() // opcional
  });
}
