import React from "react"

interface propsType {
    buttonText: string,
    eventHandler: React.MouseEventHandler<HTMLButtonElement>,
    disable?: boolean,
}

export default function ButtonComponents(props: propsType) {
    const { buttonText, eventHandler, disable } = props

    // 버튼 클래스 변수로 분리
    const buttonClass = `
        flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm
        ${disable ? 'bg-gray-400 cursor-auto' : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'}
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    `

    return (
        <div>
            <button
                type="button"
                className={buttonClass}
                onClick={eventHandler}
                disabled={disable}
            >
                {buttonText}
            </button>
        </div>
    )
}