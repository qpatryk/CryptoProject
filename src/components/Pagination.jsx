import React from 'react';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {

    // Files in the public directory are served at the root path.
    // Instead of /public/index.css, use /index.css.

    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
            >
                Prev
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={currentPage === number ? 'active' : ''}
                >
                    {number}
                </button>
            ))}

            <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
