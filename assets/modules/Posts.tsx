import React, { ReactNode } from 'react'
import Post from './Post'

interface Props{
    children: any
}

const Posts = ({children}:Props) => {
  return (
    <>
      <div className="posts">
        {children}
      </div>
    </>
  )
}

export default Posts