// PostPage.tsx
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import PaginationComponent from '../components/PaginationConponent'
import ButtonComponents from '../components/ButtonComponents'
import PostComponents from '../components/PostComponents'
import apiClient from '../apiClient'

interface PostsStateType{
    id: number,
    title: string,
    timestamp: Date,
    hits: number,
}

export default function PostPage() {
    const [posts, setPosts] = useState<PostsStateType[]>([])
    const [page, setPage] = useState<number>(1)
    const [kw, setKw] = useState<string>('')
    const [totalPages, setTotalPages] = useState<number>(1)

    useEffect(() => {
        fetchPosts()

    }, [page, kw])
    

    const fetchPosts = async () => {
        try {
            const response: any = await apiClient.Get('/api/posts', {
                params: {
                    page: page,
                    kw: kw, // 검색 키워드
                },
            }).send()

            const data = await response.json()
            setPosts(data.content);{/*여기서 비동기 문제 발생 중*/}
            setTotalPages(data.totalPages)
        } catch (error) {
            console.error('게시글을 가져오는 중 오류 발생:', error)
        }
    }   

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKw(e.target.value)
    }

    const handleSearch = () => {
        setPage(1)
        fetchPosts()
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    return (
        <div className="flex flex-col justify-center space-y-4 h-full">
            <Navbar visibleSubmenu={true} logoRedirectUrl="/"></Navbar>
            <div className="flex flex-col mt-4 space-y-2 h-full">
                <div className="flex flex-col m-auto shadow-lg rounded-md h-full">
                    {posts.map((post) => (
                        <PostComponents
                            id={post.id} // id 속성 전달
                            title={post.title}
                            date={post.timestamp.toLocaleDateString()} // 날짜 추출
                            time={post.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} // 시간 추출 (시:분)
                            count={post.hits}
                        />
                    ))}
                </div>
            </div>
            <div className="w-full space-y-2">
                <div className="flex justify-center space-x-1">
                    <div className="max-w-xs w-full">
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-md"
                            value={kw}
                            onChange={handleInputChange}
                        />
                    </div>
                    <ButtonComponents buttonText="검색" eventHandler={handleSearch}></ButtonComponents>
                </div>
                <PaginationComponent
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                ></PaginationComponent>
            </div>
        </div>
    )
}