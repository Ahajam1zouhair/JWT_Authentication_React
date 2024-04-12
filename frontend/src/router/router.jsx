import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import NavBar from "../components/Layout/navBar";
// import Home from "../pages/home";
// import Create from "../pages/create";
import Home from "../pages/home";
import ProtectedRoute from "../components/protctedRouter";
import Create from "../pages/create";
import Update from "../pages/update";

export default function Router() {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <Create />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update/:id"
          element={
            <ProtectedRoute>
              <Update />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" replace/> : <Login />}
        />
        <Route
          path="/register"
          element={isAuthenticated ? <Navigate to="/" replace/> : <Register />}
        />
      </Routes>
    </BrowserRouter>
  );
}
