import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Compte créé avec succès");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de l'inscription";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Connecté avec succès");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la connexion";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Déconnecté avec succès");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la déconnexion";
      toast.error(errorMessage);
    }
  },
}));
