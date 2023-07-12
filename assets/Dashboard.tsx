import * as React from 'react';
import Nav from './modules/Nav';
import Post from './modules/Post';
import { useState } from 'react';
import { useEffect } from 'react';
import Container from './modules/Container';
import PostModal from './modules/PostModal';
import Posts from './modules/Posts';
import SearchResults from './modules/SearchResults';

const convertToPost = (response: any)=>{
    let posts = response.map((post: any)=>{
      return <Post 
        text      = {post.text} 
        img       = {post.image} 
        comments  = {post.comments} 
        id        = {post.id}
        reactions = {post.reactions}
        key       = {post.id} 
      />
    });
    return posts
}

const toggleModalStatus = (modalstatus: any, setModalStatus: any)=>{
  setModalStatus(!modalstatus)
}

function Dashboard() {
  const [results, setResults] = useState([''])
  const [posts, setPosts] = useState([''])
  const [modalStatus, setModalStatus] = useState(false)

  useEffect(()=>{
    fetch("http://192.168.1.36:8002/async/posts").then(response => response.json()).then((data)=>setPosts(convertToPost(data)))
  }, [])

  return (<>
    <Nav updateResults={setResults}>
      <a className="refresh" onClick={()=>{
        fetch("http://192.168.1.36:8002/async/posts").then(response => response.json()).then((data)=>setPosts(convertToPost(data)))
      }}>Refresh</a>
      <a id="createPost" onClick={()=>toggleModalStatus(modalStatus, setModalStatus)}>create post</a>
    </Nav>
    <Container>
      <Posts>
        {posts}
      </Posts>
      <SearchResults>
        {results}
      </SearchResults>
    </Container>
    <PostModal status={modalStatus} setStatus={setModalStatus}></PostModal>
  </>)
}

export default Dashboard;