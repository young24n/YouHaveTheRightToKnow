interface propsType{
    dataType: string,
    placeholder: string,
    eventHandler: React.ChangeEventHandler<HTMLInputElement> ,
    feedback?: string,   
}

export default function InputComponents(props :propsType){
    const {dataType, placeholder, feedback, eventHandler} = props

    const feedbackClass = feedback === "완벽합니다!" ? "text-green-600" : "text-red-600";

    return(
        <div className="m-auto max-w-xs w-full">
            <p className="block text-sm font-semibold leading-6 text-gray-900">{dataType}</p>
            <input type="text" placeholder={placeholder} className="input input-bordered outline-indigo-600 w-full mt-2" 
            onChange={eventHandler}
            />
            {feedback && <p className={`block text-xs font-semibold leading-6 ${feedbackClass}`}>{feedback}</p>}
            {/*feedback 글씨는 빨간 글씨로 feedback 상황 발생시 input bordered도 빨간걸로 추가 
            onChange 발생시 다시 일반 포커스 border로 -> 파란색 포커스가 좋을 듯(현재 회색)*/}
        </div>
    )   
}