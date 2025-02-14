import { CategoryType } from "@/type/categoryTypes";
import axios from "axios";

const API_KEY = process.env.X_API_KEY || "yEYaZ3R4Eq1NlQXhFXFk9kAcFzZy9uoZ";

export const getCategory = async () => {
  try {
    // Lakukan permintaan API menggunakan storeId
    const response = await axios.get("/api/categories", {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching category info:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch category info"
    );
  }
};

export const createCategory = async (
  name: string,
  description: string,
  isActive: boolean,
  parentId: string | null
) => {
  try {
    const categoryData = {
      name,
      description,
      isActive,
      parentId,
    };
    // Lakukan permintaan API menggunakan storeId
    const response = await axios.post("/api/categories", categoryData, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching product info:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch product info"
    );
  }
};

export const updateCategory = async (
  id: string,
  name: string,
  description: string,
  isActive: boolean,
  parentId: string | null
) => {
  try {
    const categoryData = {
      name,
      description,
      isActive,
      parentId,
    };

    const response = await axios.put(`/api/categories`, categoryData, {
      params: {
        categoryId: id, // Kirim ID sebagai query parameter
      },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating category:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to update category"
    );
  }
};
