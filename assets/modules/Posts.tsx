import React, { ReactNode } from 'react'
import Post from './Post'

interface Props{
    children: any
}

// const renderPosts = function(posts: [], setPosts: CallableFunction){
//   let posts2 = posts.map((post: any)=>{
//     return <Post text={post.text} 
//           img={post.image} 
//           comments={post.comments} 
//           id={post.id}
//           reactions={post.reactions}
//           key={post.id} 
//     />
//   })
//   setPosts(posts2)
//   return posts2
// }

const Posts = ({children}:Props) => {
    // let [initialRefresh, setInitialRefresh] = React.useState(false)
    // let [posts, setPosts] = React.useState("s")
    
    // let posty2 = children.map((post: any)=>{
    //     return <Post text={post.text} 
    //           img={post.image} 
    //           comments={post.comments} 
    //           id={post.id}
    //           reactions={post.reactions}
    //           key={post.id} 
    //     />
    // });
    // setPosts(posty2)
  return (
    <>
        {children}
    </>
  )
}

export default Posts