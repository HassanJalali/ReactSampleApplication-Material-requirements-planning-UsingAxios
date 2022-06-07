import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const AssignProductionCost = (props) => {
  const [productionLineProductState, setProductionLineProduct] =
    useState(props);

  const [productionCostsId, setProductionCostsId] = useState([]);
  const [assignProductionCostId, setAssignProductionCostId] = useState({
    ProductionLineId: productionLineProductState.ProductionLineId,
    ProductionCode: productionLineProductState.ProductionCode,
    ProductionCostId: "",
    
  });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setProductionLineProduct(props);
    LoadProductionCost();
  }, [props]);

  const LoadProductionCost = async () => {
    var { data } = await axios.get(
      `https://localhost:7295/api/ProductionLines/GetProductionCostId?productionCode=${productionLineProductState.ProductionCode}`
    );
    var getData = data.Result;
    setProductionCostsId(getData);
  };

  const { ProductionLineId, ProductionCostId } = assignProductionCostId;
  const onInputChange = (e) => {
    setAssignProductionCostId({
      ...assignProductionCostId,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (assignProductionCostId.ProductionCostId === "") {
      return toast.error("شناسه محصول را انتخاب کنید.");
    }

    var res = await axios
      .post(
        "https://localhost:7295/api/ProductionLines/AssignProductionCostIdToProduction",
        assignProductionCostId
      )
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });

    if (res.status == 200) {
      toast.success("شناسه با موفقیت به محصول تخصیص داده شد.");
      handleClose();
      props.loadProductionLine();
    }
  };

  return (
    <>
      <Button variant="outline-success" onClick={handleShow}>
        تخصیص شناسه محصول
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* خط تولید </Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={productionLineProductState.ProductionLineName}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* محصول </Form.Label>
              <Form.Control
                type="text"
                disabled
                placeholder={productionLineProductState.ProductionName}
                readOnly
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* شناسه محصول </Form.Label>
              <select
                name="ProductionCostId"
                value={ProductionCostId}
                onChange={(e) => onInputChange(e)}
                className="form-control form-control-md mb-2 "
                type="text"
                placeholder="  شناسه محصول را انتخاب کنید."
                autoComplete="off"
              >
                <option hidden>شناسه محصول را انتخاب کنید.</option>
                {[]
                  .concat(productionCostsId)
                  .sort((a, b) => (a.Id < b.Id ? 1 : -1))
                  .map((cs) => (
                    <option key={cs.Id} value={cs.Id}>
                      شناسه محصول : {cs.Id} | قیمت محصول : {cs.Price}
                    </option>
                  ))}
              </select>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer dir={"ltr"}>
            <Button
              className="btn m-2 w-25 "
              variant="outline-danger"
              onClick={handleClose}
            >
              لغو
            </Button>
            <Button
              type="submit"
              variant="outline-primary"
              className="btn m-2 w-25"
            >
              ثبت
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default AssignProductionCost;
