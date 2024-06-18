// import React from "react";

// const Pagination = ({ currentPage, totalPages, onPageChange }) => {
//   const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

//   return (
//     <div className="bmc-pagination">
//       {pageNumbers.map((page) => (
//         <button key={page} className={page === currentPage ? "active" : ""} onClick={() => onPageChange(page)}>
//           {page}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default Pagination;





import React from "react";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>
      );
    }
    return buttons;
  };

  return <div className="bmc-pagination">{renderPaginationButtons()}</div>;
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;

