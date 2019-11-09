import React, {useState, useEffect} from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const NewPlayer = ({ history }) => {
    const [playerName, setPlayerName] = useState('');
    
    useEffect(() => {
        localStorage.removeItem('curentUser');
    }, [])

    const onCreatePlayer = () => {
        if (playerName) {
            localStorage.setItem('curentUser', playerName);
            history.push('/game');
        }
    }

    return (
        <Container maxWidth="sm">
            <Box component="div" m={1} style={{display: 'flex', flexDirection: 'column'}}>
                <TextField
                    id="standard-basic"
                    label="Player Name"
                    margin="normal"
                    onChange={(event) => {
                        if (event.target.value.length < 100) {
                            setPlayerName(event.target.value);
                        } 
                    }}
                />
                <Button variant="contained" color="primary" onClick={onCreatePlayer}>
                    Create
                </Button>
            </Box>
        </Container>
    )
};

export default withRouter(NewPlayer);