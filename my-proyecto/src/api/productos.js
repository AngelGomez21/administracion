import { ENV } from "../utils";
import Axios from "axios";

export class Producto {
  baseApi = ENV.BASE_API;

  async createProducto(formData) {
    try {
      const url = `${this.baseApi.replace(/\/$/, "")}${ENV.API_ROUTES.CREATEPRODUCTO}`;
      const response = await Axios.post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al crear producto:", error);
      throw error;
    }
  }

  async getProducto() {
    try {
      const url = `${this.baseApi.replace(/\/$/, "")}${ENV.API_ROUTES.GETPRODUCTO}`;
      const response = await Axios.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return [];
    }
  }

  async delProducto(id) {
    try {
      const url = `${this.baseApi.replace(/\/$/, "")}${ENV.API_ROUTES.DELPRODUCTO}/${id}`;
      const response = await Axios.delete(url);
      return response.data;
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      throw error;
    }
  }

  async updateProducto(id, formData) {
    try {
      const url = `${this.baseApi.replace(/\/$/, "")}${ENV.API_ROUTES.UPDATEPRODUCTO}/${id}`;
      const response = await Axios.put(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      throw error;
    }
  }
}
