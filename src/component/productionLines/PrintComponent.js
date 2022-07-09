import React, { useRef } from "react";
import { Button } from "react-bootstrap";
import useScrollPosition from "../layout/useScrollPosition";
import { useReactToPrint } from "react-to-print";
import UnscannedProductionHeader from "./UnscannedProductionHeader";

const PrintComponent = () => {
  const scrollPosition = useScrollPosition();
  console.log(scrollPosition);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div className="container">
      <div className="text-center">
        <Button
          className="btn mt-3 px-5 py-2"
          onClick={handlePrint}
          id="addbtn"
        >
          چاپ
        </Button>
      </div>
      <UnscannedProductionHeader ref={componentRef} />
    </div>
  );
};

export default PrintComponent;
