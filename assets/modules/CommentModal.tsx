import React from 'react'

interface Props{
    updateCallback: CallableFunction
}

const closeModal = ()=>{
    let modal = document.querySelector<HTMLElement>("#commentModal")
    if(modal){
        modal.style.display = "none"
    }
}

const sendComment = (updateCallback:CallableFunction)=>{
    let textarea = document.querySelector<HTMLInputElement>("#commentText")
    let uri = window.location.href
    if(textarea && uri){
        let commentText = textarea.value
        let splittedUri = uri.split("/")
        splittedUri.reverse()
        let postId = splittedUri[0]
        fetch("/async/comment/"+postId, {
            method: "POST",
            body: JSON.stringify({"text": commentText})
          }).then(()=>{
            updateCallback() 
          })
        }
}

const CommentModal = ({updateCallback}:Props) => {
  return (
    <div id="commentModal" className="modal">

		<div className="modal-content">
			<span className="close" onClick={closeModal}>&times;</span>
			<div className="comment-form">
				<h1>Create comment</h1>
				<textarea id="commentText"></textarea>
				<button id="submitComment" onClick={()=>sendComment(updateCallback)}>create comment</button>
			</div>
		</div>

	</div>
  )
}

export default CommentModal