import React, { ReactNode } from 'react'

interface Props{
  children: ReactNode;
}

const Nav = ({children}:Props) => {
  return (
    <>
    <div className="nav">
        <div className="bar">
        <a href="/dashboard">
            <img src="/images/logo6.png"/>
            </a>
        </div>
        <div className="bar">
            <input type="text" placeholder="search" className="searchbar"/>
        </div>
        <div className="bar">
            {children}
            <a href="/dashboard">board</a>
            <a href="/profile/0">profile</a>
            <a href="{{path('app_logout')}}">logout</a>
        </div>
    </div>
    </>
  )
}

export default Nav