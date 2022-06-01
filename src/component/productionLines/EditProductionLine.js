import { React, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import "./Css/EditProductioLine.css";

const EditProductionLine = (props) => {
  const [productionLineState, setProductionLineState] = useState(props);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [productionLine, setProductionline] = useState({
    ProductionLineName: "",
    CostCenterName: "",
  });

  const [costCenters, setCostCenters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const req = await axios(
        "https://localhost:7295/api/ProductionLines/GetCostCentersCode"
      );
      setCostCenters(req.data.Result);
    };
    fetchData();
  }, []);

  const { ProductionLineName, CostCenterName } = productionLine;
  const onInputChange = (e) => {
    setProductionline({ ...productionLine, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadProductionLine();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (productionLine.ProductionLineName == "") {
      return toast.error(".نام خط تولید را وارد کنید");
    }
    if (productionLine.CostCenterName == "") {
      return toast.error(" .نام مرکز هزینه را انتخاب کنید");
    }

    var res = await axios
      .put(
        `https://localhost:7295/api/ProductionLines/UpdateProductionLine/${productionLineState.Id}`,
        productionLine
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
    if (res.status == "200") {
      toast.success("خط تولید با موفقیت ویرایش شد.");
      handleClose();
      props.loadProductionLine();
    }
  };

  const loadProductionLine = async () => {
    const result = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetProductionLineById/${productionLineState.Id}`
    );
    setProductionline(result.data);
  };
  return (
    <>
      <Button className="btn btn-success" onClick={handleShow}>
        ویرایش
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* نام خط تولید </Form.Label>
              <Form.Control
                name="ProductionLineName"
                value={ProductionLineName}
                onChange={(e) => onInputChange(e)}
                type="text"
                placeholder="نام خط تولید را وارد کنید."
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* مرکز هرینه </Form.Label>
              <select
                className="form-control form-control-md mb-2 "
                type="text"
                placeholder="نام مرکز هزینه را وارد کنید."
                name="CostCenterName"
                value={CostCenterName}
                onChange={(e) => onInputChange(e)}
                autoComplete="off"
              >
                <option defaultValue readOnly>
                  نام مرکز هزینه را وارد کنید.
                </option>
                {costCenters.map((cs) => (
                  <option key={cs.Id} value={cs.Name}>
                    {cs.Name}
                  </option>
                ))}
              </select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer dir={"ltr"}>
            <Button className="btn btn-danger m-2 w-25 " onClick={handleClose}>
              لغو
            </Button>
            <Button type="submit" className="btn btn-primary m-2 w-25">
              ویرایش
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default EditProductionLine;
