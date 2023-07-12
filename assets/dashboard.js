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


shrinkComments()