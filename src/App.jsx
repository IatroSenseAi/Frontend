import { Routes, Route, Navigate } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import CompleteProfile from "./components/CompleteProfile";

import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";

import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth, needsProfileCompletion } =
    useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  // If user is authenticated but needs to complete profile
  if (authUser && needsProfileCompletion) {
    return <CompleteProfile />;
  }

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
