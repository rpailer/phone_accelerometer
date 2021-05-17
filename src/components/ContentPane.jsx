import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import axios from "axios";

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

export default function ContentPane () {
    const classes = useStyles();
    console.log("Content Pane");
    const [recording, setRecording] = React.useState(false);
    const [orgId, setOrgId] = React.useState("ygbety");
    const [devType, setDevType] = React.useState("Raspy");
    const [devId, setDevId] = React.useState("raspi-sim");
    const [eventType, setEventType] = React.useState("motion");
    const [token, setToken] = React.useState("");

    const handleAcceleration = (event) => {
        console.log("Handle acceleration")
//        console.log(event);
        if(recording) {
            var data = {
                d: {
                    acceleration: {
                        x: event.acceleration.x,
                        y: event.acceleration.y,
                        z: event.acceleration.z
                    }
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
        if(recording) {
            var data = {
                d: {
                    orientation: {
                        alpha: event.alpha,
                        beta: event.beta,
                        gamma: event.gamma
                    }
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
        window.addEventListener('devicemotion', handleAcceleration)
        window.addEventListener('deviceorientation', handleOrientation)
            return () => {
                window.removeEventListener('devicemotion', handleAcceleration)
                window.removeEventListener('deviceorientation', handleOrientation)
                    };
        // eslint-disable-next-line
          }, [recording]);

    const handleStart = () => {
        console.log("Start");
        setRecording(true);
        console.log("recording:" + recording)
    };

    const handleStop = () => {
        console.log("Stop");
        setRecording(false);
        console.log("recording:" + recording)
    };



    return (
        <div>
            <Box m={2}>
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
            </Box>
            <Divider/>
            <Box m={2}>
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
            </Box>
        </div>
    );
}