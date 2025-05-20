import axios from "axios";

const localH = "http://localhost:4000/api";            // Base API
const uploadsPath = "http://localhost:4000/uploads/";  // Ruta para acceder a imágenes subidas

export const ENV = {
  BASE_API: localH,
  BASE_PATH: uploadsPath,   // Para mostrar imágenes, apunta directo a /uploads/
  API_ROUTES: {
    CREATEPRODUCTO: "/createproducto",
    GETPRODUCTO: "/getproducto",
    DELPRODUCTO: "/delproducto",
    UPDATEPRODUCTO: "/updateproducto"  // Si usas actualización, mejor incluirlo aquí
  }
};
