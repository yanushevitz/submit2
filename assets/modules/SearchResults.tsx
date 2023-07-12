import React, { ReactNode } from 'react'

interface Props{
    children: ReactNode
}

const SearchResults = ({children}:Props) => {
  return (
    <div className='results'>
        {children}
    </div>
  )
}

export default SearchResults