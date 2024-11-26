import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import apiClient from "../api/apiClient";

const initialState = {
  userName: "",
  isLoggedIn: false,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

// Kullanıcı Kayıt (Sign Up) İşlemi
export const userSignUp = createAsyncThunk(
  "user/signUp",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/register/", userInfo);
      return response.data; // API'den dönen yanıt
    } catch (error) {
      return rejectWithValue(error.response?.data || "Bir hata oluştu");
    }
  }
);

// Kullanıcı Giriş (Login) İşlemi
export const userLogin = createAsyncThunk(
  "user/login",
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/auth/login/", userInfo);
      const data = response.data;
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Bir hata oluştu");
    }
  }
);

// Token Kontrolü
export const checkToken = createAsyncThunk(
  "user/checkToken",
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        return { accessToken };
      } else {
        throw new Error("Token bulunamadı!");
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Kullanıcı Verilerini Getirme (Fetch User Data)
export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/auth/retrieve/"); // Token otomatik eklenecek
      return response.data.first_name + " " + response.data.last_name;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Bir hata oluştu");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.userName = "";
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login İşlemi
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Sign Up İşlemi
      .addCase(userSignUp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        localStorage.setItem("accessToken", action.payload.access);
        localStorage.setItem("refreshToken", action.payload.refresh);
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Token Kontrol İşlemi
      .addCase(checkToken.fulfilled, (state, action) => {
        state.isLoggedIn = !!action.payload.accessToken;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })

      // Fetch User Data İşlemi
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload; // Kullanıcı adını state'e kaydet
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
