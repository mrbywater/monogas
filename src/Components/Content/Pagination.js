import "./Shop.scss"
const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        pageNumbers.map(number => (
            <div key={number} onClick={() => paginate(number)} className={`page ${currentPage === number ? 'activeButton' : ''}`}>
                {number}
            </div>
        ))
    )
}

export {Pagination}