import React from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import SearchIcon from '@material-ui/icons/Search';
import { Avatar, IconButton } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";

function Sidebar() {
    return (
        <div className="sidebar">
        <div className="sidebar_header">
        <Avatar src="https://avatars2.githubusercontent.com/u/2712956?s=400&u=b71527e605ae1b748fc2d4157a842e57e427ad44&v=4" />
            <div className="sidebar_headerRight">
            <IconButton>
            <DonutLargeIcon />
            </IconButton>
            <IconButton>
            <ChatIcon />
            </IconButton>
            <IconButton>
            <MoreVertIcon />
            </IconButton>
                
            </div>
        </div>
        

        <div className="sidebar_search">
            <div className="sidebar_searchContainer">
            <SearchOutlined />
            <input placeholder="Search or start new chat" type="text" />
            </div>
        </div>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        </div>
    
    );
}

export default Sidebar;
