
import React from 'react'
import PostByCategory from '@/app/components/PostByCategory';

const page = ({ params }: { params: { catName: string } }) => {
    const paramscatName = params.catName
    return (
        <>
            <PostByCategory params={params} />
        </>
    )
}

export default page