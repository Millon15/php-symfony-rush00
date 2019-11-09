import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Link} from 'react-router-dom';

const MenuTop = ({history}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [userName, setUserName] = useState('');
    
    const handleClick = event => {
        const name = localStorage.getItem('curentUser');
        if (name) {
            setUserName(name);
        }
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
    console.log(history)
    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                Open Menu
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><Link to="/new-player" style={{textDecoration: 'none', color: 'black'}}>New</Link></MenuItem>
                {userName && <MenuItem onClick={handleClose}>Save</MenuItem>}
                <MenuItem onClick={handleClose}>Load</MenuItem>
                {history && <MenuItem onClick={handleClose}>Cancel</MenuItem>}
            </Menu>
        </div>
    )
}

export default MenuTop;