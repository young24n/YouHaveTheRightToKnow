interface propsType{
    title: string,
    date: string,
    time: string,
    count: number
}

export default function PostComponents(props: propsType){
    const {date, title, time, count} = props
    return(
        <div className="flex flex-row justify-start p-3">
            <a href="/post" className="w-80 whitespace-nowrap truncate max-w-lg">{title}</a>
            <p className="w-32 whitespace-nowrap">{date}</p>
            <p className="w-20 whitespace-nowrap">{time}</p>
            <p className="w-10 whitespace-nowrap">{count}</p>
        </div>
    )
}