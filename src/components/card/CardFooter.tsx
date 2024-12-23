interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-xs font-semibold text-white bg-gray-600 rounded-lg shadow-md transition transform hover:brightness-110 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
                Prev
            </button>

            {Array.from({ length: totalPages }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => onPageChange(index + 1)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg transition transform hover:scale-105 hover:brightness-110 
            ${currentPage === index + 1
                            ? 'bg-gradient-to-r from-gray-500 to-gray-700 text-white shadow-lg'
                            : 'bg-gray-100 text-gray-500'} 
            ${currentPage === index + 1 ? 'scale-105' : ''}`}
                >
                    {index + 1}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-xs font-semibold text-white bg-gray-600 rounded-lg shadow-md transition transform hover:brightness-110 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </>
    );
};

export default Pagination;
