import React from "react";

interface Props{
    reactions: string;
    id: string;
    showLink?: boolean;
    owner?:number;

}

const PostMenu = ({reactions, id, showLink = true, owner=0}: Props) => {
  return (
    <>
        <div className="menu">
            <div className='post-menu'>
                {showLink ? <a href={"/post/" + id}>see thread</a> : null}
                <a href=''>report</a>
                <a className='follow'>follow thread</a>
            </div>
        </div>
    </>
  )
}

export default PostMenu