function Pagination({ currentPage, totalPages, onPageChange }) {

    return (

        <div className="w-full max-w-lg mx-auto bg-white flex items-center justify-between rounded-lg shadow-sm h-8 p-4 text-slate-600 my-4">
            <button
                className="hover:text-green-600 cursor-pointer"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </button>

            <span>
                Page {currentPage} of {totalPages}
            </span>

            <button
                className="hover:text-green-600 cursor-pointer"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>

    );
}

export default Pagination;