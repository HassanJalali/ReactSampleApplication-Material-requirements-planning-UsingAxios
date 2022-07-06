import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { getCurrentUser, logout } from "../../services/AuthService";
import { NavLink } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import "./Css/Navbar.css";
import { toast } from "react-toastify";

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
    // toast.success("شما با موفقیت از برنامه خارج شدید.");
    window.location.replace("login");
    // setTimeout(() => {}, 4000);
  };
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container ">
            <NavLink className="navbar-brand" to="/">
              <img
                src="http://shonizit:1000/wp-content/uploads/2016/11/photo_2016-11-10_09-25-58-300x300.png"
                style={{ height: 100 }}
              />
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#nvbCollapse"
              aria-controls="nvbCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="nvbCollapse">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item pl-1">
                  <NavLink className="nav-link" to="/">
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
              </ul>
            </div>
            <div className="d-flex justify-content-around">
              <div className="collapse navbar-collapse " id="nvbCollapse">
                <ul className="navbar-nav ml-auto">
                  {userData && (
                    <React.Fragment>
                      <li className="nav-item pl-1">
                        <NavLink className="nav-link" to="/">
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
                  {/* <li className="nav-item pl-1">
                  
                </li> */}
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
