import axios from "axios";

const API_KEY = process.env.X_API_KEY || "yEYaZ3R4Eq1NlQXhFXFk9kAcFzZy9uoZ";

export const authLogin = async (email: string, password: string) => {
  try {
    const authData = {
      email,
      password,
    };
    // Lakukan permintaan API menggunakan storeId
    const response = await axios.post("/api/auth/login", authData, {
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

export const authLogout = async () => {
  try {
    // Lakukan permintaan API menggunakan storeId
    const response = await axios.post("/api/auth/logout", {
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
