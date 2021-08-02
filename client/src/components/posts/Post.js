import { Avatar, Button } from "@material-ui/core";
import React from "react";
import "./Post.css";
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';



import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux'

import { deletePost, likePost } from '../../actions/posts'


function Post({ setCurrentId, post }) {

  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem('profile'));
  // console.log( post, 'iam post' )
  // console.log(user, 'iam user' )
 
  const Likes = () => {
    if (post.likes.length > 0) {
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><MonetizationOnIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><AttachMoneyIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><AttachMoneyIcon fontSize="small" />&nbsp;Like</>;
  };
 
  return (
    <div className="post">
      <div className="postTop">
        <div  className="userPost">
        <Avatar src={post.imageUrl} className="postAvatar" />
        <div className="postTopInfo">
          <h3>{post.name}</h3>
          {/* <p>{new Date(timestamp?.toDate()).toUTCString()}</p> */}
          <span>{post.createdAt}</span>
        </div>
        </div>
        <div className="postEdit">
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button
            onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontsize= "default" />
          </Button>
           )}
        </div>
      </div>
      <div className="postBottom">
        <p>{post.message}</p>
      </div>
      <div className="postImage">
        <img src={post.selectedFile } alt="" />
      </div>
      <div className="postOptions">
          <Button className="postOption" disabled={!user?.result} onClick={()=> dispatch(likePost(post._id))}>
              <span>Good Price</span>
              <Likes />
          </Button>
          {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button className="postOption" onClick={()=> dispatch(deletePost(post._id))}>
              <DeleteIcon  />
              <span>Delete</span>
          </Button>
           )}
      </div>
      
    </div>
  );
}

export default Post;
