import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

const MenuTop = ({history}) => {
    const [userName, setUserName] = useState('');
    
    useEffect(() => {
        const name = localStorage.getItem('currentUser');
        if (name) {
            setUserName(name);
        }
    }, [])

    const handleSave = () => {
        //some aapi call to save file
    };

    const handleLoadGame = () => {
        history.push('/game');
    };

    return (
        <div>
            <Link to="/new-player" style={{textDecoration: 'none', color: 'black'}} className="MuiButtonBase-root MuiButton-root MuiButton-contained">New Game</Link>
            {userName && <Button variant="contained" color="default" onClick={handleSave}>Save</Button>}
            <Button variant="contained" color="default" onClick={handleLoadGame}>Load</Button>
        </div>
    )
}

export default MenuTop;