import "./Shop.scss"
const Pagination = ({itemsPerPage, totalItems, paginate, currentPage}) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        pageNumbers.map(number => (
            <a
                key={number}
                href="#pagination"
                onClick={() => {
                    paginate(number)
                }}
                className={`page ${currentPage === number ? 'activeButton' : ''}`}
                style={{textDecoration:"none"}}
            >
                {number}
            </a>
        ))
    )
}

export {Pagination}