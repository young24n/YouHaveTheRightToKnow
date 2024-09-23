// PostComponents.tsx
import React from 'react'
import { useNavigate } from 'react-router-dom'

interface PropsType {
    id: number
    title: string
    date: string
    time: string
    count: number
}

export default function PostComponents(props: PropsType) {
    const { id, date, title, time, count } = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/posts/${id}`)
    }

    return (
        <div className="flex flex-row justify-start p-3">
            <a
                onClick={handleClick}
                className="w-80 whitespace-nowrap truncate max-w-lg cursor-pointer"
            >
                {title}
            </a>
            <p className="w-32 whitespace-nowrap">{date}</p>
            <p className="w-20 whitespace-nowrap">{time}</p>
            <p className="w-10 whitespace-nowrap">{count}</p>
        </div>
    )
}
