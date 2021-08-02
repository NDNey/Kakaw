import React from 'react'
import './SidebarRow.css'
import './Sidebar.css'
import SidebarRow  from './SidebarRow'
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

function Sidebar() {
    const user = JSON.parse(localStorage.getItem('profile'))
   
    return (
        <div className='sidebar'>
           <SidebarRow src={user?.result?.imageUrl} title={user?.result?.name} />
           <SidebarRow Icon={PeopleAltIcon}title ='whathever I want' />
           <SidebarRow Icon={PeopleAltIcon}title ='whathever I want' />
           <SidebarRow Icon={PeopleAltIcon}title ='whathever I want' />
           <SidebarRow Icon={PeopleAltIcon}title ='whathever I want' />
           <SidebarRow Icon={PeopleAltIcon}title ='whathever I want' />
         
        </div>
    )
}

export default Sidebar
