interface propsType {
    buttonText: string,
    eventHandler: React.MouseEventHandler<HTMLButtonElement>,
    disable?: boolean,
    className?: string,// className 추가
}

export default function ButtonComponents(props: propsType) {
    const { buttonText, eventHandler, disable, className } = props

    const buttonClass = `
    flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm whitespace-nowrap
    ${disable ? 'bg-gray-400 cursor-auto' : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'}
    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600
    ${className}`// 추가된 className을 적용

    return (
        <button
            type="button"
            className={buttonClass}
            onClick={eventHandler}
            disabled={disable}
        >
            {buttonText}
        </button>
    )
}