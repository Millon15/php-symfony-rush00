import React, {useEffect, useState} from 'react';
import Container from '@material-ui/core/Container';
import { Button } from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const Fight = ({ history }) => {
    const [playerInfo, setPlayerHP] = useState({damage: 1, hp: 3});
    const [enemyInfo, setEnemyInfo] = useState({damage: 1, hp: 3, poster: 'https://images.unsplash.com/photo-1508161773455-3ada8ed2bbec?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'});

    const [playerDeath, showPlayerDeath] = useState(false);
    const [enemyDeath, showEnemyDeath] = useState(false);

    useEffect(() => {
        //some api call
    }, [])

    const handleFight = () => {
        const chance = Math.floor(Math.random() * 2) + 1;
        if (chance === 1) {
            setPlayerHP(prevInfo => {
                if (prevInfo.hp - enemyInfo.damage <= 0) {
                    showPlayerDeath(true);
                }
                return {hp: prevInfo.hp - enemyInfo.damage, damage: prevInfo.damage};
            });
        } else {
            setEnemyInfo(prevInfo => {
                if (prevInfo.hp - playerInfo.damage <= 0) {
                    showEnemyDeath(true);
                }
                return {poster: prevInfo.poster, hp: prevInfo.hp - playerInfo.damage};
            });
        }
    }

    const useStyles = makeStyles(theme => ({
        paper: {
          position: 'absolute',
          width: 400,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[5],
          padding: theme.spacing(2, 4, 3),
        },
    }));
    const classes = useStyles();

    const handleLeave = () => history.push('/game')
    
    return (
    <Container maxWidth="sm">
        <div className="fightContainer">
            <div className="player">
                <img src="https://images.unsplash.com/photo-1532641415120-6ae8c0e29507?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60" alt="my-face"/>
                <Typography>
                    My HP: {playerInfo.hp}
                </Typography>
                <Typography>
                    My strength: {playerInfo.damage}
                </Typography>
            </div>
            <div className="actions">
                <Button onClick={handleFight} color="secondary" variant="contained">Fight</Button>
                <Button color="primary" variant="contained" onClick={handleLeave}>Leave</Button>
            </div>
            <div className="enemy">
                <img src={enemyInfo.poster} alt="enemy-face"/>
                <Typography>
                    Enemy HP: {enemyInfo.hp}
                </Typography>
                <Typography>
                    Enemy strength: {enemyInfo.damage}
                </Typography>
            </div>
        </div>

        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={playerDeath}
            onClose={() => {
                //some api call say api i lose
                history.push('/game')
            }}
        >
            <div className={classes.paper} style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
                <Typography>Unfortunately you died</Typography>
            </div>
        </Modal>

        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={enemyDeath}
            onClose={() => {
                //some api call to let know back record this movie
                history.push('/game')
            }}
        >
            <div className={classes.paper} style={{top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center'}}>
                <Typography>Huray! You win.</Typography>
            </div>
        </Modal>
    </Container>
    )
};

export default Fight;