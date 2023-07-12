import React, { useState } from 'react'
import SearchResult from './SearchResult'

interface Props{
    updateResults: CallableFunction;
}


async function fetchSearchResults(phrase: string) {
    return await fetch("/async/search", {
      method: 'POST',
      body: JSON.stringify({ "phrase": phrase })
    }).then((response)=>{
      return response.json()
    })
  }


const SearchBox = ({updateResults}:Props) => {
    const [phrase, setPhrase] = useState("")

    const handleChange = (event: any)=>{
        setPhrase(event.target.value)
    }

    const handleSend = async (event: any)=>{
        if (event.code === "Enter"){
            if(phrase){
                let result = await fetchSearchResults(phrase)
                let posts = document.querySelector<HTMLElement>(".posts")
                let results = document.querySelector<HTMLElement>(".results")
                if(posts && results){
                    posts.style.display="none"
                    results.style.display="block"
                }
                let formattedResults = result.map((element: any)=>{
                    return <SearchResult result={element}></SearchResult>
                })
                updateResults(formattedResults)
            }else{
                let posts = document.querySelector<HTMLElement>(".posts")
                let results = document.querySelector<HTMLElement>(".results")
                if(posts && results){
                    posts.style.display="block"
                    results.style.display="none"
                }
            }

        }
    }

    // if(phrase && )

  return (
    <input type="text" placeholder="search" className="searchbar" value={phrase} onChange={handleChange} onKeyDown={handleSend}/>
  )
}

export default SearchBox

/*
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
*/