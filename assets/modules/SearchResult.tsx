import React from 'react'

interface Props{
    result: any
}

const SearchResult = ({result}:Props) => {
  return (
    <div className='result'>
        <div className="result-text">{result.text}</div>
        <div className="result-author">{result.author}</div>
        <a href={/post/+result.id}>Go to thread</a>
    </div>
  )
}

export default SearchResult