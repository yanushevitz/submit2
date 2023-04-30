import './styles/profile.css';

async function fetchProfile(){
    let uri = window.location.pathname
    let id = uri.split("/")
    id = id.reverse()[0]

    let profile = await fetch('/async/profile/'+id, {
        method: "POST"
    }).then((res)=>res.json())
    
    let container = document.querySelector(".container")
    let profileDiv = document.createElement("div")

    profileDiv.append(profile.id)
    profileDiv.append(profile.nickname)
    profileDiv.append(profile.auth0)
    container.append(profileDiv)
}


fetchProfile()