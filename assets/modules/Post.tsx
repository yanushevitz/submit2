import React from 'react'
import PostMenu from './PostMenu';
import PostComment from './PostComment';

interface Props{
    text: string;
    img: string;
    comments: string[];
    id: string;
    reactions: string;
}

const Post = ({text, img, comments, id, reactions}: Props) => {
  return (
    <>
        <div className="post">
            <div className="text">
              {text}
            </div>
            <div className="image">
              <img src={"http://192.168.1.36:8002/uploads/"+img}></img>
            </div>
            <PostMenu id={id} reactions={reactions}></PostMenu>
            {comments.map((comment: any)=>{
                return <PostComment author={comment.author} text={comment.text}></PostComment>
            })}
        </div>
    </>
  )
}

export default Post