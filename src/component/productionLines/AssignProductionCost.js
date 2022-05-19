import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AssignProductionCost = () => {
  // const [show, setShow] = useState(false);

  // const handleShow = () => setShow(true);

  return (

    <>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        {/* onClick={handleShow} */}
        <Button variant="primary" >
          Launch Form modal
        </Button>
      </div>
      {/* show={show} */}
      <Modal >
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <></>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">Close Modal</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AssignProductionCost;
