import React from "react";
import "./Pagination.css";
const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-center ">
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              tabIndex="-1"
              //onClick={() => setNumber(number - 1)}
            >
              قبلی
            </a>
          </li>
          {pageNumbers.map((number) => (
            <li className="page-item" key={number}>
              <a onClick={() => paginate(number)} className="page-link">
                {number}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a
              className="page-link"
              href="#"
              //onClick={() => setNumber(number + 1)}
            >
              بعدی
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
