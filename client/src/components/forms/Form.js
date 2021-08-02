// import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import './PostItems.css'
// import VideocamIcon from '@material-ui/icons/Videocam'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import{ createPost, updatePost } from '../../actions/posts'
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import './Form.css';
import Modal from 'react-modal';



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
//how to get the current ID 

function Form({currentId, setCurrentId}) {
    // const [{ user }, dispatch] = useStateValue()
    // const [input, setInput] = useState('')
    // const [imageUrl, setImageUrl] = useState('')

    //model fnctio
   
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal() {
      setIsOpen(false);
    }
    //////////

    const [postData, setPostData] = useState({  title:'', message:'', tags:'', selectedFile:''})
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'))

    const dispatch= useDispatch()
 

    useEffect(() => {
      
        if (post) {
          openModal()
          setPostData(post)
        };
        
      }, [post]);
      
    const clear = () => {
        setCurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });
      };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({...postData, name: user?.result?.name, imageUrl:user?.result?.imageUrl}))
     
        }else {
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name,imageUrl:user?.result?.imageUrl}));
            
        }

        clear();
        // setInput('')
        // setPostData({ ...postData, message: '', selectedFile: ''})
      
        // setImageUrl('')
        closeModal()
    }
    if (!user?.result?.name) {
      return (
        <Paper className='clases'>
          <Typography variant="h6" align="center">
            Please Sign In to create your own memories and like other's memories.
          </Typography>
        </Paper>
      );
    }
    return (
        <Paper className='paper'>
       <button onClick={openModal}>FORM</button>
<Modal
  isOpen={modalIsOpen}
  // onAfterOpen={afterOpenModal}
  onRequestClose={closeModal}
  style={customStyles}
 
>
  <button onClick={closeModal}>close</button>
 
  <form autoComplete="off" noValidate className='root' onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? `Editing Product` : 'What are you selling?'}</Typography>
          <TextField name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value })} />
          <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} />
          <div className='fileInput'><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
          <Button className='buttonSubmit' variant="contained" color="primary"  type="submit" >Submit</Button>
          <Button variant="contained" color="secondary"  onClick={clear} >Clear</Button>
        </form>
</Modal>
      </Paper>

     
    )
}

export default Form
