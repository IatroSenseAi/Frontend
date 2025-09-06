import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

const useGoogleLogin = () => {
  const { googleAuth } = useAuthStore();

  useEffect(() => {
    // Load Google API script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignIn,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInButton"),
        {
          theme: "outline",
          size: "large",
          width: 300,
          text: "continue_with",
          shape: "pill",
        }
      );
    }
  };

  const handleGoogleSignIn = async (response) => {
    const result = await googleAuth(response.credential);
    return result;
  };

  return { initializeGoogleSignIn };
};

export default useGoogleLogin;
