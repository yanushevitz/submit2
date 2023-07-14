import React, { ReactNode } from 'react'

interface Props{
    children?: any;
    name: string;
}

const Credentials = ({children, name}:Props) => {
  return (
    <>
    <div className='profile'>
      <div className="profile-nick">
        {name}
      </div>
    </div>
    </>
    
  )
}

export default Credentials