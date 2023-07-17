import React from 'react'
import PostMenu from './PostMenu';
import PostComment from './PostComment';

interface Props{
    text: string;
    img: string;
    comments: string[];
    id: string;
    reactions: string;
    showLink?:boolean;
    limit?:number;
}

const Post = ({text, img, comments, id, reactions, showLink=true, limit=0}: Props) => {
  let commentsLength = comments.length
  comments = comments.reverse()
  if(limit){
    if(commentsLength > limit){
      let remainder = commentsLength - limit
      for (let i = 0; i < remainder; i++) {
        comments.pop()
      }  
    }
  }
  return (
    <>
        <div className="post">
            <div className="text">
              {text}
            </div>
            <div className="image">
              <img src={"http://192.168.5.12:8002/uploads/"+img}></img>
            </div>
            <PostMenu id={id} reactions={reactions} showLink={showLink}></PostMenu>
            {comments.map((comment: any)=>{
                return <PostComment author={comment.author} text={comment.text}></PostComment>
            })}
        </div>
    </>
  )
}

export default Post