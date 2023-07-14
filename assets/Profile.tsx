import React, { useEffect, useState } from 'react'
import Nav from './modules/Nav'
import Container from './modules/Container'
import Credentials from './modules/Credentials'


async function fetchProfile(){
    let uri = (window.location.pathname).split("/")
    let id = uri.reverse()[0]

    return await fetch('/async/profile/'+id, {
        method: "POST"
    }).then((res)=>res.json())
    // .then((res)=>renderProfile(res))
}

function renderProfile(profile:any){
    // let container = document.querySelector(".container")
    // let profileDiv = document.createElement("div")
    // profileDiv.setAttribute("class", "profile")

    // let nick = document.createElement("div")
    // let image = document.createElement("div")

    // nick.setAttribute("class", "profile-nick")
    // image.setAttribute("class", "profile-image")

    // console.log(profile)

    // nick.innerText = profile.profile.nickname
    // image.innerHTML = "<img src='"+ profile.picture +"'>"

    // profileDiv.append(image)
    // profileDiv.append(nick)

    // if(container){
    //     container.append(profileDiv)
    
    //     let posts = document.createElement("div")
    //     posts.setAttribute("class", "posts")
    
    //     profile.posts.forEach(function (a) {
    //         let post = document.createElement('div')
    //         let text = document.createElement('div')
    //         let image = document.createElement('div')
    //         let menu = document.createElement('div')
    //         let comments = document.createElement('div')
        
    //         post.setAttribute('class', 'post')
    //         text.setAttribute('class', 'text')
    //         image.setAttribute('class', 'image')
    //         menu.setAttribute('class', 'menu')
    //         comments.setAttribute('class', 'comments')
        
    //         text.innerText = a.text
    //         image.innerHTML = "<img src='http://judasz.ddns.net:8000/uploads/" + a.image + "'>"
    //         menu.innerHTML = "<div class='post-menu'><span class='reactions'>reactions: " + a.reactions + "</span><a href=/post/" + a.id + ">see thread</a><a href=''>report</a><a href=''>follow thread</a></div>"
        
    //         a.comments.forEach(function (a) {
    //           let comment = document.createElement("div")
    //           let author = document.createElement('div')
    //           let text = document.createElement('div')
        
        
    //           comment.setAttribute("class", "comment")
    //           author.setAttribute("class", "author")
    //           text.setAttribute("class", "text")
        
    //           author.innerText = "Author"
    //           text.innerText = a.text
        
    //           comment.append(author)
    //           comment.append(text)
        
    //           comments.append(comment)
        
    //         })
        
    //         post.append(text)
    //         post.append(image)
    //         post.append(menu)
    //         post.append(comments)
    //         posts.append(post)
    //       })
    //       container.append(posts)
    // }
}

const Profile = () => {
  let [profile, setProfile] = useState({profile:{auth0:"", id:"", nickname:"" },posts:{} })
  useEffect(()=>{
    fetchProfile().then((data)=>setProfile(data))
  }, [])
  fetch('/async/auth0user', {
    method: "POST"
}).then((res)=>console.log(res))


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




  return (
    <>
        <Nav/>
        <Container>
          <Credentials name={profile.profile.nickname}></Credentials>
        </Container>
    </>
  )
}

export default Profile