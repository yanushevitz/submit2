import './styles/post.css';

async function fetchPost(){
    let postId = window.location.href
    postId = postId.split("/")
    postId.reverse() 
    
    let a = await fetch("/async/post/"+postId[0]).then(response => response.json())

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
    menu.innerHTML = "<div class='post-menu'><span class='reactions'>reactions: " + a.reactions + "</span><a href=''>report</a><a href=''>follow thread</a></div>"

    if(a.comments){
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

    }
    post.append(text)
    post.append(image)
    post.append(menu)
    document.querySelector(".container").append(post)
    document.querySelector(".container").append(comments)
}
function addCommentFormListener(){
  let button = document.querySelector("#submitComment")
  button.addEventListener("click", ()=>sendComment())
}

async function sendComment(){
  let commentText = document.querySelector("#commentText").value
  
  let postId = window.location.href
  postId = postId.split("/")
  postId.reverse()
  postId = postId[0]

  let status = await fetch("/async/comment/"+postId, {
    method: "POST",
    body: JSON.stringify({"text": commentText})
  })

}

async function refreshComments($lastCommentId){

  let comments = await fetch("/async/comments/"+$lastCommentId)

}


function commentModal() {

  var modal = document.getElementById("commentModal");
  
  var span = document.getElementsByClassName("close")[0];
  let vutn = document.querySelector("#createComment");
  
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
fetchPost()
commentModal()
addCommentFormListener()