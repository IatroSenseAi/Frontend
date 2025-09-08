import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import Cours from "./pages/Cours";
import Flashcards from "./pages/Flashcards";
import Quizz from "./pages/Quizz";
import QCMs from "./pages/QCMs";
import CasCliniques from "./pages/CasCliniques";
import MonCompte from "./pages/MonCompte";
import CompleteProfile from "./components/CompleteProfile";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const { authUser, checkAuth, isCheckingAuth, needsProfileCompletion } =
    useAuthStore();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  if (authUser && needsProfileCompletion) {
    return <CompleteProfile />;
  }

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={!authUser ? <Landing /> : <Navigate to="/cours" replace />}
        />
        <Route
          path="/auth"
          element={!authUser ? <Auth /> : <Navigate to="/cours" replace />}
        />
        <Route
          path="/cours"
          element={authUser ? <Cours /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/flashcards"
          element={authUser ? <Flashcards /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/quizz"
          element={authUser ? <Quizz /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/qcms"
          element={authUser ? <QCMs /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/cas-cliniques"
          element={
            authUser ? <CasCliniques /> : <Navigate to="/auth" replace />
          }
        />
        <Route
          path="/mon-compte"
          element={authUser ? <MonCompte /> : <Navigate to="/auth" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
