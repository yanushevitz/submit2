import React, { ReactNode } from 'react'
import SearchBox from './SearchBox';

interface Props{
  children?: ReactNode;
  updateResults?: CallableFunction;
}

const Nav = ({children=null, updateResults=function(){}}:Props) => {
  return (
    <>
    <div className="nav">
        <div className="bar">
        <a href="/dashboard">
            <img src="/images/logo6.png"/>
            </a>
        </div>
        <div className="bar">
            <SearchBox updateResults={updateResults}></SearchBox>
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