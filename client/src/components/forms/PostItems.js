import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import './PostItems.css'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import Form from './Form';
// import useStyles from '../styles';

//how to get the current ID 

function PostItems({ currentId, setCurrentId }) {
    // const [{ user }, dispatch] = useStateValue()
    // const [input, setInput] = useState('')
    // const [imageUrl, setImageUrl] = useState('')

    const [postData, setPostData] = useState({ title: '', message: '', tags: '', selectedFile: '' })
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('profile'))


    useEffect(() => {
        if (post) setPostData(post);
    }, [post]);

    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (currentId === 0) {
            dispatch(createPost(postData));
            clear();
        } else {
            dispatch(updatePost(currentId, postData));
            clear();
        }

        // setInput('')
        // setPostData({ ...postData, message: '', selectedFile: ''})

        // setImageUrl('')
    }

    return (
        <div className='postItems'>
            <div className="postItemsTop">
                <Avatar src={user?.result?.imageUrl} />
                <form >
                    <input value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} className='postItemsInput' placeholder={'What are you Selling?'} />
                    {/* <input value={postData.selectedFile} onChange={(e) => setPostData({ ...postData, selectedFile: e.target.value })} className='postItemsInput' placeholder={'Image Item'} /> */}
                    {/* <di className="fileInput">
                        <FileBase type='file' multiple={false} onDOne={({base64}) => setPostData({ ...postData, selectedFile: base64})} />
                    </di> */}

                    {/* <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}  placeholder='Image Item' /> */}
                    <button onClick={handleSubmit} type='submit'>Hidden submit</button>
                </form>
            </div>
            <div className="postItemsBottom">

                <div className="postItemsOption">
                    {/* <Form /> */}
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Foto</h3>
                </div>
                {/* <div className="postItemsOption">
                    <VideocamIcon style={{color:'yellow'}}/>
                    <h3>whathever</h3>
                </div>
                <div className="postItemsOption">
                    <VideocamIcon style={{color:'green'}}/>
                    <h3>whathever</h3>
                </div> */}
            </div>



        </div>
    )
}

export default PostItems
