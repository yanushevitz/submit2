import './styles/profile.css';

async function fetchProfile(){
    let uri = window.location.pathname
    let id = uri.split("/")
    id = id.reverse()[0]

    let profile = await fetch('/async/profile/'+id, {
        method: "POST"
    }).then((res)=>res.json()).then((res)=>renderProfile(res))
}

function renderProfile(profile){
    let container = document.querySelector(".container")
    let profileDiv = document.createElement("div")
    profileDiv.setAttribute("class", "profile")

    let nick = document.createElement("div")
    let image = document.createElement("div")

    nick.setAttribute("class", "profile-nick")
    image.setAttribute("class", "profile-image")

    console.log(profile)

    nick.innerText = profile.profile.nickname
    image.innerHTML = "<img src='"+ profile.picture +"'>"

    profileDiv.append(image)
    profileDiv.append(nick)

    container.append(profileDiv)

    let posts = document.createElement("div")
    posts.setAttribute("class", "posts")

    profile.posts.forEach(function (a) {
        let post = document.createElement('div')
        let text = document.createElement('div')
        let image = document.createElement('div')
        let menu = document.createElement('div')
        let comments = document.createElement('div')
    
        post.setAttribute('class', 'post')
        text.setAttribute('class', 'text')
        image.setAttribute('class', 'image')
        menu.setAttribute('class', 'menu')
        comments.setAttribute('class', 'comments')
    
        text.innerText = a.text
        image.innerHTML = "<img src='http://127.0.0.1/uploads/" + a.image + "'>"
        menu.innerHTML = "<div class='post-menu'><span class='reactions'>reactions: " + a.reactions + "</span><a href=/post/" + a.id + ">see thread</a><a href=''>report</a><a href=''>follow thread</a></div>"
    
        a.comments.forEach(function (a) {
          let comment = document.createElement("div")
          let author = document.createElement('div')
          let text = document.createElement('div')
    
    
          comment.setAttribute("class", "comment")
          author.setAttribute("class", "author")
          text.setAttribute("class", "text")
    
          author.innerText = "Author"
          text.innerText = a.text
    
          comment.append(author)
          comment.append(text)
    
          comments.append(comment)
    
        })
    
        post.append(text)
        post.append(image)
        post.append(menu)
        post.append(comments)
        posts.append(post)
      })
      container.append(posts)
}

fetchProfile()
