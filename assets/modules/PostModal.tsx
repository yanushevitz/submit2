import React, { useState } from 'react'

interface Props{
    status: boolean;
    setStatus: CallableFunction
}

const PostModal = ({status, setStatus}: Props) => {
  return (
    <>
        <div id="postModal" style={{display: status?"block":"none"}} className="modal">
            <div className="modal-content">
                <span className="close" onClick={()=>setStatus(false)}>&times;</span>
                <div className="post-form">
                    <form method="POST" id="postForm">
                        <h1>Create post</h1>
                        <textarea id="text"></textarea>
                        <input type="file"/>
                    </form>
                    <button id="submitPost">Create post</button>
                </div>
            </div>

        </div>
    </>
  )
}

export default PostModal