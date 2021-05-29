import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, Grid, TextField, Typography } from "@material-ui/core";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: theme.spacing(1),
        width: '25ch',
      },
  }));

export default function Score () {
    const classes = useStyles();

    const [recording, setRecording] = React.useState(false);
    const [motionset, setMotionset] = React.useState("");
    const [deploymentId, setDeploymentId] = React.useState("");
    const [apikey, setApiKey] = React.useState("");
    const [dataObj, setDataObj] = React.useState({dataArray: []});



    const handleAcceleration = (event) => {
        console.log("Handle acceleration")
        let now = new Date();
        if(recording) {
            var data = {
                d: {
                    acceleration: {
                        x: event.acceleration.x,
                        y: event.acceleration.y,
                        z: event.acceleration.z
                    },
                    date: now.toISOString(),
                    timestamp: now.getTime(),
                    motionset: motionset,
                }
            };
            setDataObj({ dataArray: [...dataObj.dataArray, data]});
        }
    }

    const handleOrientation = (event) => {
        console.log("handle orientation");
        let now = new Date();
        if(recording) {
            var data = {
                d: {
                    orientation: {
                        alpha: event.alpha,
                        beta: event.beta,
                        gamma: event.gamma
                    },
                    date: now.toISOString(),
                    timestamp: now.getTime(),
                    motionset: motionset,
                }
            };
            console.log("adding orientation data");
            console.log("array:" + dataObj.dataArray)
            setDataObj({ dataArray: [...dataObj.dataArray, data]});
            console.log()
            console.log(dataObj);
        }
    }

    const handleStart = () => {
        console.log("Start");
        let now = new Date();
        setMotionset(now.toISOString());
        setRecording(true);
        console.log("recording:" + recording)
    };

    const handleStop = () => {
        console.log("Stop");
        setRecording(false);
        console.log("recording:" + recording)
        console.log(dataObj);
    };

    useEffect(() => {
        console.log("Use effect");  
        window.addEventListener('devicemotion', handleAcceleration)
        window.addEventListener('deviceorientation', handleOrientation)
            return () => {
                window.removeEventListener('devicemotion', handleAcceleration)
                window.removeEventListener('deviceorientation', handleOrientation)
                    };
        // eslint-disable-next-line
          }, [recording, dataObj]);

    return (
        <div>
            <Grid m={2} justify="center" alignItems="center">
            <TextField
                required
                id="depl-id"
                label="Deployment Id"
                value={deploymentId}
                className={classes.textField}
                onChange={(e) => { setDeploymentId(e.target.value); }}
            />
            <TextField
                required
                id="api-key"
                label="API Key"
                value={apikey}
                className={classes.textField}
                onChange={(e) => { setApiKey(e.target.value); }}
            />
            <Box p={2}><Divider/></Box>
            <Grid item justify="center">
            </Grid>
            <Typography>Sensor Data Transfer</Typography>
            {recording ? (
                <div>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<PauseCircleOutlineIcon/>}
                    onClick={handleStop}
                >
                    Stop
                </Button>                    
                </div>
            
            ): (
                <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<PlayCircleOutlineIcon/>}
                    onClick={handleStart}
                >
                    Start
                </Button>
                </div>
            )}
            </Grid>
        </div>
    );
}