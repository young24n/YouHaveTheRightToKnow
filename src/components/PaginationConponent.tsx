import { Button, Pagination } from "react-daisyui";

//하위 요소들을 조회하고 반복 시켜야함
export default function PaginationComponent(){
    return(
        <div className="join">
            <button className="join-item btn">1</button>
            <button className="join-item btn btn-active">2</button>
            <button className="join-item btn">3</button>
            <button className="join-item btn">4</button>
        </div>  
    )
} 