import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

function readStoredValue(key, fallback) {
  const value = localStorage.getItem(key);
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [usuario, setUsuario] = useState(() => readStoredValue("usuario", null));
  const [carritoActivo, setCarritoActivo] = useState(() =>
    readStoredValue("carritoActivo", null)
  );

  const login = (newToken, newUser) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("usuario", JSON.stringify(newUser));
    setToken(newToken);
    setUsuario(newUser);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    localStorage.removeItem("carritoActivo");
    setToken("");
    setUsuario(null);
    setCarritoActivo(null);
  };

  const guardarCarritoActivo = (carrito) => {
    localStorage.setItem("carritoActivo", JSON.stringify(carrito));
    setCarritoActivo(carrito);
  };

  const value = useMemo(
    () => ({
      token,
      usuario,
      carritoActivo,
      isLoggedIn: Boolean(token),
      isAdmin: usuario?.rol === "admin",
      login,
      logout,
      guardarCarritoActivo,
    }),
    [token, usuario, carritoActivo]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider");
  }
  return context;
}
