import React from "react";

interface PropsType {
    type: string,
    dataType: string,
    placeholder: string,
    eventHandler: React.ChangeEventHandler<HTMLInputElement>,
    feedback?: string,
    disable?: boolean
}

export default function InputComponents(props: PropsType) {
    const { type, dataType, placeholder, feedback, eventHandler, disable } = props

    const feedbackClass = feedback === "완벽합니다!" ? "text-green-600" : "text-red-600";
    const borderClass = feedback === "완벽합니다!" ? "border-green-600 input-success" : feedback ? "border-red-600 input-error" : "border-gray-300 input-primary"
    const inputClass = `input w-full mt-2 ${borderClass}`

    return (
        <div className="m-auto max-w-xs w-full">
            <p className="block text-sm font-semibold leading-6 text-gray-900">{dataType}</p>
            <input
                type={type}
                placeholder={placeholder}
                className={inputClass}
                onChange={eventHandler}
                disabled={disable}
            />
            {feedback && <p className={`block text-xs font-semibold leading-6 ${feedbackClass}`}>{feedback}</p>}
        </div>
    )
}