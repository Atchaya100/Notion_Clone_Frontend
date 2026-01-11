import { Routes, Route } from "react-router-dom";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import PrivateRoute from "./privateRoute";
import Home from "../pages/Home";
import Page from "../pages/Page";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

       {/* Protected route */}
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute> } />

        <Route
        path="/page/:pageId"
        element={
          <PrivateRoute>
            <Page />
          </PrivateRoute> } />
  


    </Routes>
  );
}