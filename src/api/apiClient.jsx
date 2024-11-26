import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Django API'nin BASE URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Token Yenileme İşlemi (Refresh token HttpOnly çerezde saklanıyor)
const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/auth/refresh/", 
      {}, // Refresh token, HttpOnly çerezde olduğu için body boş
      { withCredentials: true } // Çerezleri gönder
    );

    const newAccessToken = response.data.access;
    // Yeni access token'ı localStorage'a kaydet
    localStorage.setItem("accessToken", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error.response?.data || error.message);

    // Eğer refresh token geçersizse kullanıcıyı çıkış yap
    localStorage.removeItem("accessToken");
    window.location.href = "/"; // Kullanıcıyı ana sayfaya yönlendir

    throw error;
  }
};

// Interceptor ile 401 Hatalarında Token Yenileme
apiClient.interceptors.response.use(
  (response) => response, // Başarılı yanıtları aynen döner
  async (error) => {
    const originalRequest = error.config;

    // Eğer 401 hatası alınırsa ve daha önce yeniden deneme yapılmadıysa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken(); // Yeni access token al
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Yeni token'ı ekle
        return apiClient(originalRequest); // Orijinal isteği tekrar gönder
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error); // Diğer hataları aynen döner
  }
);

// Request Interceptor: Her istekte Authorization başlığı ekle
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default apiClient;
