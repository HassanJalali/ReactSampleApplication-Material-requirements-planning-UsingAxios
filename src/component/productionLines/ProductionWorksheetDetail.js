import { toast } from "react-toastify";
import { React, useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { createProductionWorksheetDetail } from "../../services/ProductionWorksheet-Service";

const ProductionWorksheetDetail = (props) => {
  const [productionHeaderState, setProductionHeaderState] = useState(props);
  const [userId, setUserId] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setUserId(productionHeaderState.UserId);
    setProductionHeaderState(props);
  }, [props]);

  const onUserIdChange = async (e) => {
    setUserId(e.target.value);
  };

  const [numberOfRow, setNumberOfRow] = useState("");
  const onNumberOfRowChange = async (e) => {
    setNumberOfRow(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (numberOfRow === "") {
      return toast.error("تعداد ردیف ها را وارد کنید.");
    }

    let params = {
      ProductionWorksheetId: productionHeaderState.ProductionWorksheetId,
      RegistrarId: userId,
      NumberOfRow: numberOfRow,
    };

    const request = await createProductionWorksheetDetail(params);
    if (request.status == 200) {
      toast.success("جزئیات محصول تولیدی  با موفقیت ایجاد شد.");
      handleClose();
      props.LoadProductionHeaders();
    }
  };

  return (
    <>
      <Button variant="outline-primary" className="btn" onClick={handleShow}>
        ثبت جزئیات
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> سر برگ محصول </Form.Label>
              <Form.Control
                disabled
                type="text"
                placeholder={productionHeaderState.ProductId}
                readOnly
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label> ثبات </Form.Label>
              <Form.Control
                name="userId"
                disabled
                type="text"
                value={userId}
                onChange={(e) => onUserIdChange(e)}
              />
            </Form.Group>
            <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
              <Form.Label>* تعداد کارتن </Form.Label>
              <Form.Control
                name="numberOfRow"
                autoComplete="off"
                value={numberOfRow}
                type="number"
                placeholder="تعداد کارتن های مورد نیاز را وارد کنید ."
                onChange={(e) => onNumberOfRowChange(e)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer dir={"ltr"}>
            <Button
              variant="outline-danger"
              className="btn  m-2 w-25 "
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

export default ProductionWorksheetDetail;
