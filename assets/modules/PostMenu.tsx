import React from "react";

interface Props{
    reactions: string;
    id: string;

}

const PostMenu = ({reactions, id}: Props) => {
  return (
    <>
        <div className="menu">
            <span className='reactions'>Reactions: {reactions}
            </span>
            <div className='post-menu'>
                <a href={"/post/" + id}>see thread</a>
                <a href=''>report</a>
                <a href='/profile/"+a.author+"'>author</a>
                <a className='follow'>follow thread</a>
            </div>
        </div>
    </>
  )
}

export default PostMenu