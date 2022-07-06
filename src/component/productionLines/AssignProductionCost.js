import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import {
  assignProductionCostIdToProduction,
  getProductionCostId,
} from "../../services/ProductionLines-Service";

const AssignProductionCost = (props) => {
  const [productionLineProductState, setProductionLineProductState] =
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
    setProductionLineProductState(props);
  }, [props]);

  const LoadProductionCost = async () => {
    const { data } = await getProductionCostId(
      productionLineProductState.ProductionCode
    );
    const result = data.Result;
    setProductionCostsId(result);
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

    const request = await assignProductionCostIdToProduction(
      assignProductionCostId
    );

    if (request.status == 200) {
      toast.success("شناسه با موفقیت به محصول تخصیص داده شد.");
      handleClose();
      props.loadProductionLine();
    }
  };

  return (
    <>
      <Button
        variant="outline-success"
        onClick={() => {
          handleShow();
          LoadProductionCost();
        }}
      >
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
