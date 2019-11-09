import React, { useEffect, useState, useCallback } from 'react';
import {Link} from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Badge from '@material-ui/core/Badge';
import IconButton from '@material-ui/core/IconButton';
import iconSrc from '../assets/monster-svgrepo-com.svg';

const Game = ({ history }) => {
    const gameMap = new Array(5).fill(new Array(5).fill(0));
    const [curPosition, setCurPosition] = useState([2, 2]);
    const [open, setOpen] = useState(false);
    const [capturedMonsters, setCapturedMonsters] = useState(0);

    const summonDemon = useCallback(() => {
        const chance = Math.floor(Math.random() * 4) + 1;
        if (chance === 1) {
            setOpen(true);
        }
    }, []);

    const handleUserKeyPress = useCallback(event => {
        if (open) return;
        switch (event.keyCode) {
            case 37:
            // left
                setCurPosition(prevPos => {
                    if (prevPos[0] - 1 >= 0) {
                        return [prevPos[0] - 1, prevPos[1]];
                    }
                    return prevPos;
                });
                summonDemon();
                break;
            case 38:
            // up
                setCurPosition(prevPos => {
                    if (prevPos[1] - 1 >= 0) {
                        return [prevPos[0], prevPos[1] - 1]
                    }
                    return prevPos;
                });
                summonDemon();
                break;
            case 39:
            // right
                setCurPosition(prevPos => {
                    if (prevPos[0] + 1 <= 4) {
                        return[prevPos[0] + 1, prevPos[1]];
                    }
                    return prevPos;
                });
                summonDemon();
                break;
            case 40:
            // down
                setCurPosition(prevPos => {
                    if (prevPos[1] + 1 <= 4) {
                        return [prevPos[0], prevPos[1] + 1];
                    }
                    return prevPos;
                });
                summonDemon();
                break;
            default:
                break;
        }
    }, [summonDemon, open])

    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleUserKeyPress);
        };
    }, [handleUserKeyPress]);

    useEffect(() => {
        const name = localStorage.getItem('curentUser');
        if (!name) {
            history.push('/');
        } else {
            // api call to get progress
            // check if user completely won
            setCapturedMonsters(1);
        }
    }, [history]);

    const handleFight = () => {
        history.push('/fight');
    };

    const useStyles = makeStyles(theme => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
        button: {
            margin: theme.spacing(1),
            width: '50px',
          },
        sectionDesktop: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
    }));
    const classes = useStyles();

    const handleLeaveGame = () => {
        localStorage.removeItem('currentUser');
        history.push('/');
    }

    const handleSaveGame = () => {
        // api call to save progress
    }

    return (
        <Container maxWidth="sm">
            <AppBar position="static">
            <div className={classes.sectionDesktop}>
                <Link to="/world-map">
                    <IconButton aria-label="show captured monsters count" color="inherit" className={classes.button}>
                        <Badge badgeContent={capturedMonsters} color="secondary" size="small">
                            <img src={iconSrc} className="monsterBage" alt="captured monster count" />
                        </Badge>
                    </IconButton>
                </Link>
            </div>
            </AppBar>
            <table className="game-map">
                <tbody>
                    {gameMap.map((row, y) => (
                        <tr key={y}>
                            {row.map((cell, x) => (
                                <td key={`key-${x}-${cell}`}>
                                    {curPosition[0] === x && curPosition[1] === y ? '🐧' : ''}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="gameOptions">
                <Button variant="contained" color="secondary" onClick={handleLeaveGame}>Cancel</Button>
                <Button variant="contained" color="primary" onClick={handleSaveGame}>Save</Button>
            </div>

            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={() => setOpen(false)}
            >
                <div className={classes.paper} style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
                    <Typography>You faced with a moovie monster.</Typography>
                    <Typography>Would you like to fight?</Typography>
                    <div style={{display: 'flex', justifyContent: 'space-around'}}>
                        <Button color="secondary" variant="contained" onClick={() => setOpen(false)}>No</Button>
                        <Button color="primary" variant="contained" onClick={() => handleFight()}>Yes</Button>
                    </div>
                </div>
            </Modal>
        </Container>
    )
};

export default Game;