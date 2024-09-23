import { Button } from "react-daisyui"

interface propsType{
    currentPage: any,
    totalPages: any,
    onPageChange: any
}

export default function PaginationComponent(props: propsType) {
    const { currentPage, totalPages, onPageChange } = props

    // 페이지 번호 배열 생성
    const pageNumbers: number[] = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    // 페이지 버튼 클릭 핸들러
    const handlePageClick = (pageNumber: number) => {
        if (pageNumber !== currentPage) {
            onPageChange(pageNumber)
        }
    }

    return (
        <div className="join w-full justify-center">
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={`join-item btn ${pageNumber === currentPage ? 'btn-active' : ''}`}
                    onClick={() => handlePageClick(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    )
}
