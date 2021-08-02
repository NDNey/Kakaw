import React, { useState, useEffect } from 'react'
import Form from '../forms/Form';
import Feed from '../posts/Posts';
import PostItems from '../forms/PostItems';
import Header from '../header/Header';
import Sidebar from '../sidebar/Sidebar';
import './Home.css'
import Widgets from '../widgets/Widgets'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/posts'

// import './Feed.css'
const Home = () => {
    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])
    return (
        <div className='home'>
            <Header />
            <div className='appBody'>
                <Sidebar />
                <div className='feed'>
                    <Form currentId={currentId} setCurrentId={setCurrentId}  />
                    <PostItems  />
                    <Feed setCurrentId={setCurrentId}/>
                </div>
                <Widgets />
            </div>

        </div>
    );
}

export default Home;
