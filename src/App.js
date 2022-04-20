import "./App.css";
import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/pages/Home";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import Navbar from "./component/layout/Navbar";
import PageNotFound from "./component/pages/PageNotFound";
import AddProductionline from "./component/productionLines/AddProductionline";
import EditProductionLine from "./component/productionLines/EditProductionLine";
import ProductionLineProduct from "./component/production/ProductionLineProduct";
import AssignProductToProductionLine from "./component/production/AssignProductToProductionLine";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  render(
    <BrowserRouter>
      <ToastContainer position="top-left" />
      <div className="App">
        <Navbar />
        <Routes>
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

          <Route
            path="/productionLineProduct"
            element={<ProductionLineProduct />}
          ></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>,
    document.getElementById("root")
  );
}
