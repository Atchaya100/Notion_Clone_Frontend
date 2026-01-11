import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "http://localhost:8000",
  baseURL:"https://notion-backend-q0dg.onrender.com"
});

// GLOBAL RESPONSE ERROR HANDLER
axiosInstance.interceptors.response.use(
  (response) => response, // if success just return
  async (error) => {
    const originalRequest = error.config;
    console.log(error.response);
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh token API
        const res = await axiosInstance.post("/api/auth/refresh", {}, {
  withCredentials: true, // send cookies automatically
});

        const newAccessToken = res.data.accessToken;

        // save new access token
        localStorage.setItem("accessToken", newAccessToken);

        // retry original request with new token
        originalRequest.headers["Authorization"] = "Bearer " + newAccessToken;
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        // refresh failed → logout user
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/"; // redirect to login
        return Promise.reject(refreshError);
      }
    }

    console.log("API Error:", error.response?.data || error);
    return Promise.reject(error.response?.data || { error: "Something went wrong" });
  }
);


export default axiosInstance;
