import React, { useEffect, useState } from 'react'
import Nav from './modules/Nav'
import Container from './modules/Container'
import Post from './modules/Post'
import CommentModal from './modules/CommentModal'

const fetchPost = async ()=>{
    let uri = window.location.href
    let postId = uri.split("/")
    postId.reverse() 
    return await fetch("/async/post/"+postId[0]).then(response => response.json()).then((res)=>(<Post text={res.text} img={res.image} comments={res.comments} id={res.id} reactions={res.reactions} showLink={false}></Post>))
}

const toggleModal = ()=>{
    let button = document.querySelector("#commentButton")
    if(button){
        let modal = document.querySelector<HTMLElement>("#commentModal")
        if(modal){
            modal.style.display = "block"
        }
    }
}

const ViewPost = () => {
    const [post, setPost] = useState(<Post text={''} img={''} comments={[]} id={''} reactions={''}></Post>)
    useEffect(()=>{
        fetchPost()
        .then((data)=>setPost(data))
    }, [])
  return (
    <>
        <Nav>
            <a className="refresh" onClick={()=>fetchPost().then((data)=>setPost(data))}>Refresh</a>
            <a id="commentButton" onClick={toggleModal}>Add comment</a>
        </Nav>
        <Container>
            {post}
        </Container>
        <CommentModal updateCallback={()=>{
            fetchPost()
            .then((data)=>setPost(data))
        }} />
    </>
  )
}

export default ViewPost