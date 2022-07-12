import React, { useState, useEffect, useRef } from "react";
import QRCode from "react-qr-code";
import ScrollBars from "react-scrollbar";
import { getUnscannedProduction } from "../../services/ProductionWorksheet-Service";
import "./Css/UnscannedProductionHeader.scss";

const scrollBarStyle = {
  width: "100%",
  height: "750px",
};

const UnscannedProductionHeader = React.forwardRef((props, ref) => {
  const [value, setValue] = useState();
  const [back, setBack] = useState("#FFFFFF");
  const [fore, setFore] = useState("#000000");
  const [size, setSize] = useState(256);
  const [unScannedProduction, setUnscannedProduction] = useState([]);

  const loadUnscannedProduction = async () => {
    const request = await getUnscannedProduction();
    const result = request.data;
    setUnscannedProduction(result);
  };

  useEffect(() => {
    loadUnscannedProduction();
  }, []);

  return (
    <>
      <div className="container " ref={ref}>
        <ScrollBars
          horizontal
          autoHide={false}
          style={scrollBarStyle}
          className="mt-1"
        >
          <table
            className="table table-bordered mt-3 table-hover text-center "
            id="collapse1"
          >
            <thead>
              <tr>
                <th scope="row">سربرگ های اسکن نشده</th>
              </tr>
            </thead>

            <tbody>
              {unScannedProduction.map((x) => (
                <tr key={x.ProductionWorksheetId}>
                  <td scope="row">
                    <QRCode
                      value={x.ProductionWorksheetId}
                      bgColor={back}
                      fgColor={fore}
                      size={size === "" ? 0 : size}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ScrollBars>
      </div>
    </>
  );
});
export default UnscannedProductionHeader;
