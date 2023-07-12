import "./styles/dashboard.css"

/**
 * This function decreases comment's size to 180 characters in order to make commet fit in it's area (180 is random number so far)
 */

function shrinkComments() {
  let comments = document.querySelectorAll(".comment .text")
  comments.forEach(function (comment) {
    if (comment.textContent.length > 180) {
      comment.textContent = comment.textContent.substring(0, 180) + ".. [...]"
    }
  })
}

/**
 * This function adds eventListener to modal responsible for creating post. It lets modal open/close and adds closing modal by clicking ESC (seprecated, TODO fix solution)
 */

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

/**
 * This function adds eventListener to button that sends to server created post
 */

function createPost() {

  let button = document.querySelector("#submitPost")
  let form = document.querySelector("#postForm")
  button.addEventListener("click", function (object) {
    sendPost(form)
  })
}

/**
 * This function redirects to specific post (used after creating post and after clicking "see thread" beneath post's text)
 */

function redirectToPost(id) {
  window.location.href = "/post/" + id;
}

/**
 * This function sends post asynchronously (TODO add validation)
 */

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

/**
 * This function is responsible for sending request with input given in navbar and displaying it on cleaned .container
 */

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

/**
 * This function only fetches searched phrase
 */

async function fetchSearchResults(phrase) {
  return await fetch("/async/search", {
    method: 'POST',
    body: JSON.stringify({ "phrase": phrase })
  }).then(function (t) {
    return t.json()
  })
}

/**
 * This function fetches user ID from given AUTH0 identificator
 */

async function getProfileId(){
  let id = await fetch("/async/exchange").then((res)=>res.json())
}

/**
 * Now working function that going to follow threads and send notification when new comment appears TODO
 */

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


postModal()
createPost()
search()
refresh()
shrinkComments()
getProfileId()