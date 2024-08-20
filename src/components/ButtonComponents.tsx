import React from "react"

interface propsType{
    buttonText: string
    eventHandler: React.MouseEventHandler<HTMLButtonElement>;
}

export default function ButtonComponents(props: propsType){
    const {buttonText, eventHandler} = props
    return(
        <div>
            <button
                type="button"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={eventHandler}
            >
                {buttonText}
            </button>
        </div>
    )
}