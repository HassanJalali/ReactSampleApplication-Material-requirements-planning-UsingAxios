import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getCurrentUser, logout } from "../../services/AuthService";
import "./Css/Navbar.css";

const Navbar = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    try {
      const jwt = getCurrentUser();
      const user = jwtDecode(jwt);
      if (user) {
        setUserData(user);
      }
    } catch (ex) {}
  }, []);

  const logOut = () => {
    logout();
    window.location.replace("login");
  };
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container ">
            <NavLink className="navbar-brand" to="#">
              <img src={require("./Css/logo.png")} style={{ height: 100 }} />
            </NavLink>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto ">
                <li className="nav-item pl-1 ">
                  <NavLink className="nav-link current " to="/">
                    خط تولید
                  </NavLink>
                </li>
                <li className="nav-item pl-1">
                  <NavLink className="nav-link" to="productionLineProduct">
                    محصولات خطوط تولید
                  </NavLink>
                </li>
                <li className="nav-item pl-1">
                  <NavLink className="nav-link" to="workstationHome">
                    ایستگاه کاری
                  </NavLink>
                </li>
                <li className="nav-item pl-1">
                  <NavLink className="nav-link" to="AssignWorkstationHome">
                    ایستگاه کاری خطوط تولید
                  </NavLink>
                </li>

                <li className="nav-item pl-1">
                  <NavLink className="nav-link" to="productionheader">
                    سربرگ محصول
                  </NavLink>
                </li>

                <li className="nav-item pl-1">
                  <NavLink className="nav-link" to="print">
                    سربرگ های اسکن نشده
                  </NavLink>
                </li>
              </ul>
            </div>
            <div className="d-flex justify-content-around">
              <div className="collapse navbar-collapse " id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  {userData && (
                    <React.Fragment>
                      <li className="nav-item pl-1">
                        <NavLink className="nav-link" to="#">
                          {userData.name}
                        </NavLink>
                      </li>
                      <li className="nav-item pl-1">
                        <NavLink
                          className="nav-link"
                          to="login"
                          onClick={logOut}
                        >
                          <i className="fa fa-sign-out fa-fw mr-1 fa-xl "></i>
                        </NavLink>
                      </li>
                    </React.Fragment>
                  )}
                  {!userData && (
                    <React.Fragment>
                      <li className="nav-item pl-1">
                        <NavLink className="nav-link" to="login">
                          ورود
                        </NavLink>
                      </li>
                    </React.Fragment>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
