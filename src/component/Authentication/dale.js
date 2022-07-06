return (
  <nav className="navbar navbar-expand-lg navbar-dark">
    <div className="container">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink className="nav-link" to="/">
              خط تولید
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="productionLineProduct">
              محصولات خطوط تولید
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="workstationHome">
              ایستگاه کاری
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="AssignWorkstationHome">
              ایستگاه کاری خطوط تولید
            </NavLink>
          </li>
          <li className="nav-item active">
            <NavLink className="nav-link" to="productionheader">
              سربرگ محصول
            </NavLink>
          </li>
          {userData && (
            <React.Fragment>
              <li className="nav-item active">
                <NavLink className="nav-link" to="/">
                  {userData.name}
                </NavLink>
              </li>
              <li className="nav-item active">
                <NavLink className="nav-link" to="login" onClick={logOut}>
                  خروج
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {!userData && (
            <React.Fragment>
              <li className="nav-item active">
                <NavLink className="nav-link" to="login">
                  ورود
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
      <NavLink className="navbar-brand" to="/">
        <img
          src="http://shonizit:1000/wp-content/uploads/2016/11/photo_2016-11-10_09-25-58-300x300.png"
          style={{ height: 100 }}
        />
      </NavLink>
    </div>
  </nav>
);