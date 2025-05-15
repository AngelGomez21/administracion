import { ENV } from "../utils";
import Axios from "axios";

export class Producto {
    baseApi = ENV.BASE_API;

    async createProduct(data) {
        try {
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            // Imprime la URL para verificarla antes de hacer la petición
            const url = `${this.baseApi.replace(/\/$/, '')}${ENV.API_ROUTES.CREATEPRODUCTO}`;
            console.log("URL de solicitud POST:", url);

            // Hacer la petición correctamente
            const response = await Axios.post(
                url,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            console.log(response);
            console.log("Producto agregado con éxito");
        } catch (error) {
            console.error("Error al agregar el producto:", error);
        }
    }

    async getProducto() {
        try {
            const url = `${this.baseApi}${ENV.API_ROUTES.GETPRODUCTOS}`;
            const response = await Axios.get(url);
            console.log("Productos obtenidos:", response.data);
            return response.data;

        }
        catch (error) {
            console.error("Error al obtener los productos:", error);
        }
    }
}
