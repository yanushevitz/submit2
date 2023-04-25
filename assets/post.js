import './styles/post.css';

async function fetchPost(){
    let postId = window.location.href
    postId = postId.split("/")
    postId.reverse()
    
    let a = await fetch("/async/post/"+postId[0]).then(response => response.json())
    
    // console.log(a.body)
    let post = document.createElement('div')
    let text = document.createElement('div')
    let image = document.createElement('div')
    let menu = document.createElement('div')
    let comments = document.createElement('div')

    let commentForm = document.createElement('div')
    commentForm.append(createCommentForm())

    comments.append(commentForm)
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
function createCommentForm(){
  let div = document.createElement("div")
  div.setAttribute("class", "comment-form")
  div.innerHTML = "<h1>Create comment</h1>"

  let textarea = document.createElement("textarea")
  textarea.setAttribute("id", "commentText")

  let button = document.createElement("button")
  button.setAttribute("id", "createComment")
  button.innerText = "create comment"

  button.addEventListener("click", sendComment)

  div.append(textarea)
  div.append(button)
  return div
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

fetchPost()
