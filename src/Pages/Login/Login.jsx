import React, { useState, useEffect } from "react";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const decodeAndStoreToken = (accessToken, refreshToken) => {
  //   try {
  //     const decodedToken = jwtDecode(accessToken);

  //     // Validate role_id before storing tokens
  //     // if (!decodedToken || typeof decodedToken.role_id !== "number") {
  //     //   throw new Error("Invalid token structure");
  //     // }

  //     // Store tokens and decoded information
  //     localStorage.setItem("accessToken", accessToken);
  //     localStorage.setItem("refreshToken", refreshToken);
  //     localStorage.setItem("decodedToken", JSON.stringify(decodedToken));

  //     return decodedToken;
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     setError("Invalid token received");
  //     return null;
  //   }
  // };

  // const refreshAccessToken = async () => {
  //   try {
  //     const refreshToken = localStorage.getItem("refreshToken");
  //     if (!refreshToken) {
  //       throw new Error("No refresh token available");
  //     }

  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/auth/get/refreshtokenweb`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${refreshToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status === "success") {
  //       const decodedToken = decodeAndStoreToken(
  //         data.data.accessToken,
  //         data.data.refreshToken
  //       );
  //       return decodedToken ? data.data.accessToken : null;
  //     } else {
  //       throw new Error("Failed to refresh token");
  //     }
  //   } catch (error) {
  //     console.error("Error refreshing token:", error);
  //     clearAuthData();
  //     return null;
  //   }
  // };

  // const clearAuthData = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   localStorage.removeItem("decodedToken");
  // };

  // const handleRedirect = (decodedToken) => {
  //   if (decodedToken.role_id === 1) {
  //     navigate("/dashboard");
  //   } else {
  //     navigate("/login");
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BASE_URL}/auth/login`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ email, password }),
  //       }
  //     );

  //     const data = await response.json();

  //     if (data.status === "success") {
  //       const decodedToken = decodeAndStoreToken(
  //         data.data.accessToken,
  //         data.data.refreshToken
  //       );

  //       if (decodedToken) {
  //         handleRedirect(decodedToken);
  //       }
  //     } else {
  //       setError("Invalid credentials. Please try again.");
  //     }
  //   } catch (err) {
  //     setError("Something went wrong. Please try again later.");
  //     console.error("Login error:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const checkAndRefreshToken = async () => {
  //   const accessToken = localStorage.getItem("accessToken");
  //   if (accessToken) {
  //     try {
  //       const decoded = jwtDecode(accessToken);
  //       const currentTime = Date.now() / 1000;

  //       if (decoded.exp - currentTime < 300) {
  //         const newToken = await refreshAccessToken();
  //         if (newToken) {
  //           return decoded;
  //         }
  //       } else {
  //         return decoded;
  //       }
  //     } catch (error) {
  //       console.error("Error checking token:", error);
  //       clearAuthData();
  //     }
  //   }
  //   return null;
  // };

  // useEffect(() => {
  //   const checkAuth = async () => {
  //     const decodedToken = await checkAndRefreshToken();
  //     if (decodedToken) {
  //       handleRedirect(decodedToken);
  //     }
  //   };

  //   checkAuth();
  // }, [navigate]);
  const decodeAndStoreToken = (accessToken, refreshToken) => {
    try {
      const decodedToken = jwtDecode(accessToken);

      // Store tokens and decoded information
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("decodedToken", JSON.stringify(decodedToken));

      return decodedToken;
    } catch (error) {
      console.error("Error decoding token:", error);
      setError("Invalid token received");
      return null;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available");

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/get/refreshtokenweb`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      if (data.status === "success") {
        const decodedToken = decodeAndStoreToken(
          data.data.accessToken,
          data.data.refreshToken
        );
        return decodedToken ? data.data.accessToken : null;
      } else {
        throw new Error("Failed to refresh token");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      clearAuthData();
      return null;
    }
  };

  const clearAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("decodedToken");
  };

  const handleRedirect = () => {
    navigate("/dashboard"); // Always redirect to dashboard after login
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        const decodedToken = decodeAndStoreToken(
          data.data.accessToken,
          data.data.refreshToken
        );
        if (decodedToken) handleRedirect();
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const checkAndRefreshToken = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp - currentTime < 300) {
          const newToken = await refreshAccessToken();
          if (newToken) return decoded;
        } else {
          return decoded;
        }
      } catch (error) {
        console.error("Error checking token:", error);
        clearAuthData();
      }
    }
    return null;
  };

  useEffect(() => {
    const checkAuth = async () => {
      const decodedToken = await checkAndRefreshToken();
      if (decodedToken) handleRedirect();
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-50 md:p-8 p-4 justify-center items-center bg-[#f6fceb]">
      <div className="flex flex-col w-full md:w-1/2 md:p-8">
        <div className="max-w-md w-full mx-auto ">
          <h2 className="text-3xl font-bold m tet-center">Admin!</h2>
          <h2 className="text-3xl font-bold mb-6 ">Welcome back!</h2>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 bg-[#f0f6e6] focus:ring-green-400 focus:outline-none"
                placeholder="john@example.com"
                disabled={isLoading}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type={isPasswordVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-[#BFCAB4] bg-[#f0f6e6] rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="absolute inset-y-0 top-5 right-0 pr-3 flex items-center text-sm leading-5"
              >
                {isPasswordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-secondary font-bold py-2 rounded-md hover:bg-green-500 transition-colors focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:outline-none flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
