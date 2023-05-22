import './styles/dashboard.css';

function shrinkComments() {
  let comments = document.querySelectorAll(".comment .text")
  comments.forEach(function (comment) {
    if (comment.textContent.length > 180) {
      comment.textContent = comment.textContent.substring(0, 180) + ".. [...]"
    }
  })
}

async function fetchPosts() {
  let posty = await fetch("http://judasz.ddns.net:8000/async/posts").then(response => response.json())
  let last = posty[0].id;
  posty.forEach(function (a) {
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
    image.innerHTML = "<img src='http://judasz.ddns.net:8000/uploads/" + a.image + "'>"
    menu.innerHTML = "<span class='reactions'>reactions: " + a.reactions + "</span><div class='post-menu'><a href=/post/" + a.id + ">see thread</a><a href=''>report</a><a href='/profile/"+a.author+"'>author</a><a class='follow' value='"+a.id+"'>follow thread</a></div>"

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
    document.querySelector(".container").append(post)
  })
  follow()
}

function postModal() {

  let modal = document.getElementById("postModal");
  let span = document.getElementsByClassName("close")[0];
  let vutn = document.querySelector("#createPost");

  vutn.onclick = function () {
    modal.style.display = "block";
    window.addEventListener("keydown", function(p){
      if(p.keyCode == 27){
        modal.style.display = "none";
      }
    })
  }

  span.onclick = function () {
    modal.style.display = "none";
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

}

function createPost() {

  let button = document.querySelector("#submitPost")
  let form = document.querySelector("#postForm")
  button.addEventListener("click", function (object) {
    sendPost(form)
  })
}

function redirectToPost(id) {
  window.location.href = "/post/" + id;
}

async function sendPost(formData) {
  let text = formData.querySelector("textarea")
  let file = formData.querySelector("input")
  let form = new FormData()
  let postText = text.value
  form.append("file", file.files[0])
  form.append("text", postText)

  let post = await fetch("async/post", {
    method: 'POST',
    body: form
  }).then((response) => { return response.json() })
  if (post.status === "created") {
    redirectToPost(post.id)
  }

}

function clearContainer() {
  document.querySelector(".container").innerHTML = "";
}

async function search() {
  let searchbar = document.querySelector(".searchbar")
  searchbar.addEventListener("keydown", function (a) {
    if (a.keyCode == 13) {
      let phrase = searchbar.value
      if(phrase){
        clearContainer()
        let container = document.querySelector(".container")
        let resultsDiv = document.createElement("div")

        resultsDiv.setAttribute("class", "results")

        let results = fetchSearchResults(phrase).then(function (t) {
          t.forEach(function (result) {
            let resultDiv = document.createElement("div")
            
            let image = document.createElement("div")
            let text = document.createElement("div")
            let author = document.createElement("div")
            let button = document.createElement("a")
            
            resultDiv.setAttribute("class", "result")
            image.setAttribute("class", "result-img")
            text.setAttribute("class", "result-text")
            author.setAttribute("class", "result-author")
            button.setAttribute("href", "/post/"+result.id)
            
            text.innerText = result.text
            author.innerText = result.author
            button.innerText = "go to thread"
            
            resultDiv.append(image)
            resultDiv.append(text)
            resultDiv.append(button)
            resultsDiv.append(resultDiv)

          })
          container.append(resultsDiv)
        })
      }
    }
  })
}


async function fetchSearchResults(phrase) {
  return await fetch("/async/search", {
    method: 'POST',
    body: JSON.stringify({ "phrase": phrase })
  }).then(function (t) {
    return t.json()
  })
}

function refresh(){
  let button = document.querySelector(".refresh")
  button.addEventListener("click", function(){
    clearContainer()
    fetchPosts()
  })
}

async function getProfileId(){
  let id = await fetch("/async/exchange").then((res)=>res.json())
}

async function follow(){
  let followButtons = document.querySelectorAll(".follow")
  followButtons.forEach(function(button){
    button.addEventListener("click", function(event){
      let postId = button.getAttribute("value")
      let fromLocalStorage = localStorage.getItem("followed")
      fromLocalStorage = Array.from(fromLocalStorage)
      let filteredArray = []
      fromLocalStorage.forEach(function(element){
        if(element !== ","){
          filteredArray.push(element)
        }
      })

      function findSame(number){
        return number == postId
      }
      if(filteredArray.find(findSame) == undefined){
        filteredArray.push(postId)

      }
      localStorage.setItem("followed", filteredArray)
    })
  })
}

fetchPosts()
postModal()
createPost()
search()
refresh()
shrinkComments()
getProfileId()
