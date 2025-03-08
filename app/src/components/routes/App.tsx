import { Route, Routes, Navigate } from "react-router-dom";
import Home from "../../pages/Home";
import Top from "../../pages/Top/Top";
import Register from "../Layout/Register";
import { PrivateRoute } from "../../features/auth/components/PrivateRoute";
import { useAuthStore } from "../../features/auth/store/auth";

function App() {
  const { user, token } = useAuthStore();

  return (
    <Routes>
      <Route
        path="/"
        element={user && token ? <Navigate to="/home" /> : <Top />}
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PrivateRoute>
            <Register />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
