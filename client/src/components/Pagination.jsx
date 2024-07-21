import '../App.css'

export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [...Array(totalPages).keys()].map((page) => page + 1);
    return (
        <div className="flex justify-center mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 mx-2 btn-txt rounded-[14px] border border-dark-10solid hover:text-purple-100 ${currentPage === page ? 'bg-white text-dark-100' : 'bg-none'}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}