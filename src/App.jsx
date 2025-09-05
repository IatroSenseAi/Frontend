import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Home from "./pages/Home";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Landing /> : <Navigate to="/home" />}
        />
        <Route
          path="/auth"
          element={!authUser ? <Auth /> : <Navigate to="/home" />}
        />
        <Route
          path="/home"
          element={authUser ? <Home /> : <Navigate to="/auth" />}
        />
      </Routes>
    </div>
  );
}

export default App;
