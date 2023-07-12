import React from 'react'

interface Props{
    author?: string;
    text: string;
}

const PostComment = ({author = "anonymous", text}:Props) => {
  return (
    <div className='comment'>
        <div className='author'>
            {author}
        </div>
        <div className='text'>
            {text}
        </div>
    </div>
  )
}

export default PostComment