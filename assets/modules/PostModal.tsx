import React, { useState } from 'react'

interface Props{
    status: boolean;
    setStatus: CallableFunction
}

const PostModal = ({status, setStatus}: Props) => {

    const createPost = async ()=>{
        let formData = document.querySelector("#postForm")
        if(formData){
            let text = formData.querySelector("textarea")
            let file = formData.querySelector("input")
            let form = new FormData()
            if(text && file && file.files){
                let postText = text.value
                form.append("file", file.files[0])
                form.append("text", postText)
                let post = await fetch("async/post", {
                    method: 'POST',
                    body: form
                  }).then((response) => { return response.json() })
                if (post.status === "created") {
                window.location.href = "/post/" + post.id;
                }
            }

        }
    }

  return (
    <>
        <div id="postModal" style={{display: status ? "block" : "none"}} className="modal">
            <div className="modal-content">
                <span className="close" onClick={()=>setStatus(false)}>&times;</span>
                <div className="post-form">
                    <form method="POST" id="postForm">
                        <h1>Create post</h1>
                        <textarea id="text"></textarea>
                        <input type="file"/>
                    </form>
                    <button id="submitPost" onClick={createPost}>Create post</button>
                </div>
            </div>

        </div>
    </>
  )
}

export default PostModal