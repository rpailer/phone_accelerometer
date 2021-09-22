import { Box, Button, Divider, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import axios from "axios";
import DialpadIcon from '@material-ui/icons/Dialpad';

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

export default function Train () {
    const classes = useStyles();
    const [recording, setRecording] = React.useState(false);
    const [orgId, setOrgId] = React.useState("ygbety");
    const [devType, setDevType] = React.useState("Raspy");
    const [devId, setDevId] = React.useState("raspi-sim");
    const [eventType, setEventType] = React.useState("motion");
    const [token, setToken] = React.useState("");
    const [key, setKey] = React.useState("");   
    const [motionset, setMotionset] = React.useState("");

    const sendOrientation = process.env.REACT_APP_ORIENTATION === 'true' ? true : false;

    const handleAcceleration = (event) => {
        console.log("Handle acceleration")
//        console.log(event);
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
                    device: devId,
                    motionset: motionset,
                    figure: key,
                }
            };
            console.log("sending acceleration data");
            sendData(data);
        }
    }

    const handleOrientation = (event) => {
        console.log("handle orientation");
        //console.log(event);
        //console.log(recording);
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
                    device: devId,
                    motionset: motionset,
                    figure: key,
                }
            };
            console.log("sending orientation data");
            sendData(data);
        }
    }

    const sendData = (data) => {
        var url = "https://" + orgId + ".messaging.internetofthings.ibmcloud.com/api/v0002/device/types/" + devType + "/devices/" + devId + "/events/" + eventType;
        console.log("sending to: " + url);
        console.log(data);
        axios.request({
            method: "POST",
            url: url,
            data: data,
            headers: { "Content-Type": "application/json",
                       "Accept": "application/json",
                    },
            auth: {
                username: 'use-token-auth',
                password: token
                }
        });
    }

    useEffect(() => {
        console.log("Use effect");
        if ( typeof( DeviceMotionEvent ) !== "undefined" && typeof( DeviceMotionEvent.requestPermission ) === "function" ) {
            DeviceMotionEvent.requestPermission().then(response => {
                if (response === 'granted') {
                    console.log("accelerometer permission granted");
                    // Do stuff here
                }
            });  
        }
        window.addEventListener('devicemotion', handleAcceleration);
        if (sendOrientation) {
            window.addEventListener('deviceorientation', handleOrientation);
        }
            return () => {
                window.removeEventListener('devicemotion', handleAcceleration);
                if (sendOrientation) {
                    window.removeEventListener('deviceorientation', handleOrientation);
                }
                    };
        // eslint-disable-next-line
          }, [recording]);

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
    };

    const handleNumber = (k) => {
        console.log(k);
        setKey(k);
    };
    



    return (
        <div>
            <Grid m={2} justifyContent="center" alignItems="center">
            <TextField
                required
                id="org-id"
                label="Organization Id"
                value={orgId}
                className={classes.textField}
                onChange={(e) => { setOrgId(e.target.value); }}
            />
            <TextField
                required
                id="dev-type"
                label="Device Type"
                value={devType}
                className={classes.textField}
                onChange={(e) => { setDevType(e.target.value); }}
            />
            <TextField
                required
                id="dev-id"
                label="Device ID"
                value={devId}
                className={classes.textField}
                onChange={(e) => { setDevId(e.target.value); }}
            />
            <TextField
                required
                id="event-type"
                label="Event Type"
                value={eventType}
                className={classes.textField}
                onChange={(e) => { setEventType(e.target.value); }}
            />
            <TextField
                required
                id="token"
                label="Token"
                value={token}
                className={classes.textField}
                type="password"
                onChange={(e) => { setToken(e.target.value); }}
            />
            <Box p={2}><Divider/></Box>
            <Grid item justifyContent="center">
            <Box mb={3}>
                <InputLabel>Select figure</InputLabel>
                <OutlinedInput 
                        id="key_input"
                        label="selected figure"
                        readOnly
                        value={key}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                >
                                    <DialpadIcon/>
                                </IconButton>
                            </InputAdornment>
                        }
                    >

                </OutlinedInput>
                <div>
                {[7, 8, 9].map(k => (
                <Button
                    variant="outlined"
                    key={`button-${k}`}
                    onClick={e => handleNumber(k)}
                    value={k}
                    >{k}</Button>
                ))}
                </div>
                <div>
                {[4, 5, 6].map(k => (
                <Button
                    variant="outlined"
                    key={`button-${k}`}
                    onClick={e => handleNumber(k)}
                    value={k}
                    >{k}</Button>
                ))}
                </div>
                <div>
                {[1, 2, 3].map(k => (
                <Button
                    variant="outlined"
                    key={`button-${k}`}
                    onClick={e => handleNumber(k)}
                    value={k}
                    >{k}</Button>
                ))}
                </div>
                <div>
                {[0].map(k => (
                <Button
                    variant="outlined"
                    key={`button-${k}`}
                    onClick={e => handleNumber(k)}
                    value={k}
                    >{k}</Button>
                ))}
                </div>
            </Box>
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