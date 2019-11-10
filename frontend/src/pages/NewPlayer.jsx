import React, {useState, useEffect} from 'react';
import { withRouter, Link } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import axios from 'axios';

import requestRoutes from '../config/requestRoutes';

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3, 2),
    },
    appBar: {
        marginBottom: '20px',
        padding: '16px 0',
    }
  }));

const NewPlayer = ({ history }) => {
    const [playerName, setPlayerName] = useState('');
    
    useEffect(() => {
        localStorage.removeItem('currentUser');
    }, [])

    const onCreatePlayer = () => {
        if (playerName) {
            // api call
            axios.get(requestRoutes.allGame).then(response => {
                localStorage.setItem('currentUser', response.data.id);
                history.push('/game');
            }).catch(error => console.log(error));
            localStorage.setItem('currentUser', '123');
        }
    }

    const classes = useStyles();

    return (
        <Container maxWidth="sm">
            <AppBar position="static" className={classes.appBar}>
                <Link to="/game" className="customLink">
                    <Button color="inherit">Back to home</Button>
                </Link>
            </AppBar>
            <Paper className={classes.root}>
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
            </Paper>
        </Container>
    )
};

export default withRouter(NewPlayer);