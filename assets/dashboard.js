import './styles/dashboard.css';
import MicroModal from 'micromodal';

function shrinkComments() {
  let comments = document.querySelectorAll(".comment .text")
  comments.forEach(function (comment) {
    if (comment.textContent.length > 180) {
      comment.textContent = comment.textContent.substring(0, 180) + ".. [...]"
    }
  })
}


async function fetchPosts() {
  let posty = await fetch("http://127.0.0.1/async/posts").then(response => response.json())
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
    document.querySelector(".container").append(post)
  })
  let refresh = document.querySelector(".refresh")
  refresh.addEventListener("click", async function (x) {
    let posts = await fetch('/async/posts/' + 27).then(response => response.json())
    let container = document.querySelector(".container")
    console.log(posts);
    posts.forEach(function (a) {
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
    })
  })
}


function postModal() {

  let modal = document.getElementById("postModal");
  let span = document.getElementsByClassName("close")[0];
  let vutn = document.querySelector("#createPost");

  vutn.onclick = function () {
    modal.style.display = "block";
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
      clearContainer()
      let phrase = searchbar.value
      let container = document.querySelector(".container")
      let resultsDiv = document.createElement("div")

      resultsDiv.setAttribute("class", "results")


      let results = fetchSearchResults(phrase).then(function (t) {
        t.forEach(function (result) {
          let resultDiv = document.createElement("div").setAttribute("class", "result")

          let image = document.createElement("div")
          let text = document.createElement("div")
          let author = document.createElement("div")

          image.setAttribute("class", "result-img")
          text.setAttribute("class", "result-text")
          author.setAttribute("class", "result-author")

          // image.innerText = result.image
          text.innerText = result.text
          author.innerText = result.author
          author.innerText = result.author

          resultsDiv.append(image)
          resultsDiv.append(text)
          resultsDiv.append(author)

          resultsDiv.append(result)

        })
        container.append(resultsDiv)
      })
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


fetchPosts()
shrinkComments()
postModal()
createPost()
search()