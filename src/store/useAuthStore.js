import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isCheckingAuth: true,
  needsProfileCompletion: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      if (res.data) {
        set({ authUser: res.data });
      } else {
        set({ authUser: null });
      }
    } catch (error) {
      console.log("Auth check failed:", error.message);
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

  googleAuth: async (credential) => {
    try {
      const res = await axiosInstance.post("/auth/google", { credential });
      set({
        authUser: res.data,
        needsProfileCompletion: res.data.needsProfileCompletion || false,
      });

      if (res.data.needsProfileCompletion) {
        toast.success("Connecté avec Google. Veuillez compléter votre profil.");
      } else {
        toast.success("Connecté avec succès");
      }

      return {
        success: true,
        needsProfileCompletion: res.data.needsProfileCompletion || false,
      };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la connexion avec Google";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  completeGoogleProfile: async (data) => {
    try {
      const res = await axiosInstance.post("/auth/google/complete", data);
      set({
        authUser: res.data,
        needsProfileCompletion: false,
      });
      toast.success("Profil complété avec succès");
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erreur lors de la mise à jour du profil";
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
    } catch (error) {
      console.log("Logout API error (proceeding anyway):", error.message);
    } finally {
      set({ authUser: null, needsProfileCompletion: false });
      toast.success("Déconnecté avec succès");
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  },
}));
