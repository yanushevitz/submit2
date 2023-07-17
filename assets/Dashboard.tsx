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
        limit     = {2}
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

  if(window.innerWidth < 1000){
    let nav = document.querySelector(".nav")
    if(nav){
      nav.classList.add("mobile")
      let checkIsBurger = document.querySelector(".hamburger")
      if(!checkIsBurger){
        let burger = document.createElement("img")
            burger.setAttribute("class", "hamburger")
            burger.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png")
            burger.addEventListener("click", ()=>{
              let controls = document.querySelector<HTMLElement>(".controls")
              if(controls){
                if(controls.classList.contains("active")){
                  controls.classList.remove("active")
                  controls.style.transform = "translateY(-30rem)"
                }else{
                  controls.classList.add("active")
                  controls.style.transform = "translateY(3rem)"

                }
              }
            })
            nav.appendChild(burger)
          }
    }
  }
  useEffect(()=>{
    window.addEventListener("resize", (event)=>{
      if(window.innerWidth < 1000){
        let controls = document.querySelector<HTMLElement>(".controls")
        if(controls){
          controls.style.transform = "translateY(-30rem)";
        }
        let nav = document.querySelector(".nav")
        if(nav){
          nav.classList.add("mobile")
          let checkIsBurger = document.querySelector(".hamburger")
          if(!checkIsBurger){
            let burger = document.createElement("img")
            burger.setAttribute("class", "hamburger")
            burger.setAttribute("src", "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png")
            burger.addEventListener("click", ()=>{
              let controls = document.querySelector<HTMLElement>(".controls")
              if(controls){
                if(controls.classList.contains("active")){
                  controls.classList.remove("active")
                  controls.style.transform = "translateY(-30rem)"
                }else{
                  controls.classList.add("active")
                  controls.style.transform = "translateY(3rem)"

                }
              }
            })
            nav.appendChild(burger)
          }
        }
    
      }else{
        let nav = document.querySelector(".nav")
        if(nav){
          nav.classList.remove("mobile")
          let burger = document.querySelector<HTMLElement>(".hamburger")
          if(burger){
            burger.remove()
          }
          let controls = document.querySelector<HTMLElement>(".controls")
          if(controls){
            controls.style.transform = "translateY(0)";
          }
      }
    }
  })
})
  

  useEffect(()=>{
    fetch("http://192.168.5.12:8002/async/posts").then(response => response.json()).then((data)=>setPosts(convertToPost(data)))
  }, [])

  return (<>
    <Nav updateResults={setResults}>
      <a className="refresh" onClick={()=>{
        fetch("http://192.168.5.12:8002/async/posts").then(response => response.json()).then((data)=>setPosts(convertToPost(data)))
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