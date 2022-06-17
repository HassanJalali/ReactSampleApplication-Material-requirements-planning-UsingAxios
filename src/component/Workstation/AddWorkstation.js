import { React, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { defineWorkstation } from "../../services/Workstation-Service";

const AddWorkstation = (props) => {
  const [workstation, setWorkstation] = useState({
    WorkstationType: "",
  });
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setWorkstation({ WorkstationType: "" });
    setShow(true);
  };

  const { WorkstationType } = workstation;
  const onInputChange = (e) => {
    setWorkstation({ ...workstation, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (workstation.WorkstationType == "") {
      return toast.error("نام ایستگاه کاری را وارد کنید.");
    }
    const request = await defineWorkstation(workstation);
    if (request.status == 200) {
      toast.success("ایستگاه کاری با موفقیت ایجاد شد.");
      handleClose();
      props.loadWorkstations();
    }
  };

  return (
    <>
      <Button id="addbtn" className="btn mt-3 px-4 py-2" onClick={handleShow}>
        تعریف ایستگاه کاری
      </Button>

      <Modal show={show} onHide={handleClose}>
        <form onSubmit={(e) => onSubmit(e)}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>* ایستگاه کاری </Form.Label>

              <div className="form-group mb-2">
                <input
                  type="text"
                  autoComplete="off"
                  className="form-control form-control-md"
                  placeholder="نام ایستگاه کاری را وارد کنید."
                  name="WorkstationType"
                  value={WorkstationType}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer dir={"ltr"}>
            <Button
              className="btn  m-2 w-25 "
              variant="outline-danger"
              onClick={handleClose}
            >
              لغو
            </Button>
            <Button
              type="submit"
              variant="outline-primary"
              className="btn  m-2 w-25"
            >
              ثبت
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};

export default AddWorkstation;
