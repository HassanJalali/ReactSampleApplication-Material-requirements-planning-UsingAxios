import "./App.css";
import { render } from "react-dom";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import Navbar from "./component/layout/Navbar";
import PageNotFound from "./component/pages/PageNotFound";
import AddProductionline from "./component/productionLines/AddProductionline";
import EditProductionLine from "./component/productionLines/EditProductionLine";
import ProductionLineProduct from "./component/production/ProductionLineProduct";
import AssignProductToProductionLine from "./component/production/AssignProductToProductionLine";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import { StyledEngineProvider } from "@mui/material/styles";
import "react-toastify/dist/ReactToastify.css";
import WorkStation from "./component/Workstation/Workstation";
import AddWorkstation from "./component/Workstation/AddWorkstation";
import AssignWorkstationHome from "./component/productionLines/AssignWorkstationHome";
import AssignWorkstationToProductionLine from "./component/productionLines/AssignWorkstationToProductionLine";
import ProductionHeader from "./component/productionLines/ProductionHeader";
import AddProductionHeader from "./component/productionLines/AddProductionHeader";
import AssignProductionCost from "./component/productionLines/AssignProductionCost";
import LoginForm from "./component/Authentication/LoginForm";
import { getCurrentUser } from "./services/AuthService";
import React from "react";

export default function App() {
  render(
    <BrowserRouter>
      <ToastContainer
        rtl
        position="top-left"
        style={{ width: 520, fontSize: 15 }}
      />
      <div className="App">
        {getCurrentUser() && <Navbar />}
        <Routes>
          {!getCurrentUser() ? (
            <React.Fragment>
              <Route path="/login" element={<LoginForm />}></Route>
              <Route
                path="*"
                element={<Navigate to="/login" replace />}
              ></Route>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path="/" element={<Home />}></Route>

              <Route
                path="/produtionLine/add"
                element={<AddProductionline />}
              ></Route>
              <Route
                path="/productionline/edit/:id"
                element={<EditProductionLine />}
              ></Route>

              <Route
                path="/assignProductToProductionLine/add"
                element={<AssignProductToProductionLine />}
              ></Route>

              <Route path="/workstationHome" element={<WorkStation />}></Route>

              <Route
                path="/productionLineProduct"
                element={<ProductionLineProduct />}
              ></Route>

              <Route
                path="/workstation/add"
                element={<AddWorkstation />}
              ></Route>

              <Route
                path="/AssignWorkstation/add"
                element={<AssignWorkstationToProductionLine />}
              ></Route>

              <Route
                path="/AssignWorkstationHome"
                element={<AssignWorkstationHome />}
              ></Route>

              <Route
                path="/productionheader/add"
                element={<AddProductionHeader />}
              ></Route>

              <Route
                path="/assignproductioncost"
                element={<AssignProductionCost />}
              ></Route>

              <Route
                path="/productionheader"
                element={<ProductionHeader />}
              ></Route>
              <Route path="*" element={<Navigate to="/" replace />}></Route>
            </React.Fragment>
          )}
        </Routes>
      </div>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
