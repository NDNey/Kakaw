import React, { useState, useEffect } from 'react';
import "./Header.css"
import SearchIcon from "@material-ui/icons/Search";

import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { Avatar, IconButton, Button } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add'
import ForumIcon from '@material-ui/icons/Forum'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation  } from 'react-router-dom'
import decode from 'jwt-decode';
import * as actionType from '../../constants/actionTypes';

function Header() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
  
  
    const logout = () => {
      dispatch({ type: actionType.LOGOUT });
  
      history.push('/auth');
  
      setUser(null);
    };
  
    useEffect(() => {
      const token = user?.token;
  
      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
  
      setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

  return (
    <div className="header">
      <div className="headerLeft">
          <img src="https://svgsilh.com/svg_v2/3219616.svg" alt="" />
          <div className="headerInput">
              <SearchIcon />
              <input placeholder='Search Product' type="text" />
          </div>
      </div>
      <div className="headerCenter">
          <div className="headerOption headerOption--active">
              <HomeIcon fontSize="large" />
          </div>
          <div className="headerOption">
              <FlagIcon fontSize="large" />
          </div>

          <Button className="headerOption" onClick={logout} >
          <EmojiEmotionsIcon fontSize="large" />
              <span>Logout</span>
          </Button>
          <div className="headerOption">
             
          </div>
          {/* <div className="headerOption">
              <EmojiEmotionsIcon fontSize="large" />
          </div>
          <div className="headerOption">
              <EmojiEmotionsIcon fontSize="large" />
          </div> */}
      </div>
      <div className="headerRight">
          <div className="headerInfo">
              <Avatar src={user?.result.imageUrl} />
              <h4>{user?.result.name}</h4>
          </div>
          <IconButton>
          <AddIcon />
          </IconButton >
          <IconButton>
          <ForumIcon />
          </IconButton >
          <IconButton>
          <NotificationsActiveIcon />
          </IconButton >
          <IconButton>
          <ExpandMoreIcon />
          </IconButton >
         
      </div>
    </div>
  );
}

export default Header;
