import React from 'react'
// import './Feed.css'
import Post from './Post'
import { useSelector } from 'react-redux';
import "./Posts.css";


// import moment from 'moment'


function Feed({setCurrentId}) {
    const posts = useSelector((state) => state.posts)
       
    
    console.log(posts, 'I am post AKA feed');
    // console.log(postImage)
    
    return (
        <div className='posts'>
            {posts.map((post) => (
            <Post 
                setCurrentId={setCurrentId}
                post ={post}
        
               

            />))}
        </div>
    )
}

export default Feed


