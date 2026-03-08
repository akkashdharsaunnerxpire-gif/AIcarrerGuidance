import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import sideImg from "../../assets/adminimage.png";

const API_URL = "http://127.0.0.1:8000/admin";

const AdminAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    secretKey: "",
  });

  /* ================= LOGIN ================= */
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/Adminlogin`, loginData);
      localStorage.setItem("adminToken", res.data.access_token);
      navigate("/admin/layout");
    } catch (err) {
      setError(err.response?.data?.detail || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  /* ================= REGISTER ================= */
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (registerData.password !== registerData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      await axios.post(`${API_URL}/Adminregister`, {
        name: registerData.name,
        email: registerData.email,
        password: registerData.password,
        secretKey: registerData.secretKey,
      });
      setIsLogin(true);
    } catch (err) {
      setError(err.response?.data?.detail || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    /* HEIGHT AFTER NAVBAR */
    <div className="grid grid-cols-1 md:grid-cols-2 h-[calc(100vh-64px)]">

      {/* LEFT IMAGE – FULL COVER */}
      <div className="hidden md:block h-full w-full">
        <img
          src={sideImg}
          alt="Career Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* RIGHT FORM – PERFECT CENTER */}
      <div className="flex items-center justify-center bg-gradient-to-br from-indigo-100 to-purple-200 px-6">
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

          {/* Toggle */}
          <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-2 rounded-lg font-semibold ${
                isLogin ? "bg-blue-600 text-white" : "text-gray-600"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-2 rounded-lg font-semibold ${
                !isLogin ? "bg-green-600 text-white" : "text-gray-600"
              }`}
            >
              Register
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}

          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <h2 className="text-2xl font-bold text-center mb-6">
                Admin Login
              </h2>

              <input
                type="email"
                placeholder="Admin Email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg mb-4"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
                className="w-full border px-3 py-2 rounded-lg mb-6"
                required
              />

              <button
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
              >
                {loading ? "Logging in..." : "Login as Admin"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <h2 className="text-2xl font-bold text-center mb-6">
                Admin Registration
              </h2>

              {["name", "email"].map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={`Admin ${field}`}
                  value={registerData[field]}
                  onChange={(e) =>
                    setRegisterData({
                      ...registerData,
                      [field]: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 rounded-lg mb-3"
                  required
                />
              ))}

              <input
                type="password"
                placeholder="Password"
                className="w-full border px-3 py-2 rounded-lg mb-3"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border px-3 py-2 rounded-lg mb-3"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
                required
              />

              <input
                type="password"
                placeholder="Admin Secret Key"
                className="w-full border px-3 py-2 rounded-lg mb-5"
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    secretKey: e.target.value,
                  })
                }
                required
              />

              <button
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded-lg"
              >
                {loading ? "Registering..." : "Register Admin"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
