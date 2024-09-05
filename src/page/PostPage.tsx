import { Button, Pagination } from "react-daisyui";
import Navbar from "../components/Navbar";
import PaginationComponent from "../components/PaginationConponent";
import InputComponents from "../components/InputComponent";
import { ChangeEvent, MouseEvent } from "react";
import ButtonComponents from "../components/ButtonComponents";

export default function PostPage(){
    // 포스트 갯수? 10, Pagination 지원, 검색, 
    // 처음부터 모든 게시글을 불러오는 것은 불가능하니 Pagination 숫자에 의해 요청하는 형식으로 (작성날짜(년/달/일)시간(시/분))
    return(
    <div className=" flex flex-col justify-center">
        <Navbar visibleSubmenu={true} logoRedirectUrl={""}></Navbar>
        <div className="flex justify-center mt-4">
            <div>
                
            </div>
            <div className="flex space-x-2 items-center">
                <InputComponents type={"text"} dataType={""} placeholder={""} eventHandler={()=>{}}></InputComponents>
                <ButtonComponents buttonText={"검색"} eventHandler={()=>{}}></ButtonComponents>
            </div>
        </div>
        <div className="m-auto">
            <PaginationComponent></PaginationComponent>
        </div>
    </div>
    )
}