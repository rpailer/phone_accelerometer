import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Divider, FormLabel, Grid, TextField, Typography } from "@material-ui/core";
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from "react-redux";
import { setDelay, setPred, setScoreUrl, triggerScoring } from "../redux/ducks/ScoreReducer";

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
    const dispatch = useDispatch();

    const sendOrientation = process.env.REACT_APP_ORIENTATION === 'true' ? true : false;

    const [recording, setRecording] = React.useState(false);
    const [motionset, setMotionset] = React.useState("");

    const nodeRedUrl = useSelector((state) => state.score.scoreUrl);
    const pred = useSelector((state) => state.score.pred);
//    const dataObj = useSelector((state) => state.score.dataObj);
    const delay = useSelector((state) => state.score.delay);

    const [dataObj, setDataObj] = React.useState({dataArray: []});

    const handleAcceleration = (event) => {
        console.log("Handle acceleration")
        //alert("data point");
        let now = new Date();
        if(recording) {
            var data = {
                device: "phone_1",
                figure: "1",
                motionset: motionset,
                date: now.toISOString(),
                timestamp: now.getTime(),
                acceleration: {
                    x: event.acceleration.x,
                    y: event.acceleration.y,
                    z: event.acceleration.z
                },
            };
            if (dataObj.dataArray.at(-1)) {
                console.log("last " + dataObj.dataArray.at(-1).timestamp);
                let timeDiff = now - dataObj.dataArray.at(-1).timestamp;
                if (timeDiff > delay) {
                    setDataObj({ dataArray: [...dataObj.dataArray, data]});
                }
            } else {
                setDataObj({ dataArray: [...dataObj.dataArray, data]});
            }
        }
    }

    const handleOrientation = (event) => {
        console.log("handle orientation");    
        //alert("data point");
        let now = new Date();
        if(recording) {
            var data = {
                device: "phone_1",
                figure: "1",
                motionset: motionset,
                date: now.toISOString(),
                timestamp: now.getTime(),
                orientation: {
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                },
            };
            console.log(dataObj.dataArray.at(-1))
            if (dataObj.dataArray.at(-1)) {
                console.log("last " + dataObj.dataArray.at(-1).timestamp);
                let timeDiff = now - dataObj.dataArray.at(-1).timestamp;
                if (timeDiff > delay) {
                    setDataObj({ dataArray: [...dataObj.dataArray, data]});
                }
            } else {
                setDataObj({ dataArray: [...dataObj.dataArray, data]});
            }
        }
    }

    const handleStart = () => {
        console.log("Start");
        let now = new Date();
        setMotionset(now.toISOString());
        setRecording(true);
        setDataObj({dataArray: []});
        dispatch(setPred(null));
        console.log("recording started")
    };

    const handleStop = () => {
        console.log("Stop");
        setRecording(false);
        console.log("recording stopped")
    };

    const handleSend = () => {
        console.log("Send");
        dispatch(triggerScoring(dataObj));
    };

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
        if(recording) {
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
    }
          }, [dataObj]);

    return (
        <div>
            <Grid m={2} justifyContent="center" alignItems="center">
            <TextField
                required
                id="nrUrl"
                label="Node Red URL"
                value={nodeRedUrl}
                className={classes.textField}
                onChange={(e) => { dispatch(setScoreUrl(e.target.value)) }}
            />
            <TextField
                required
                type="number"
                id="delay"
                label="Delay between data points"
                value={delay}
                className={classes.textField}
                onChange={(e) => { dispatch(setDelay(e.target.value)) }}
            />

            <Box p={2}><Divider/></Box>
            <Grid item justifyContent="center">
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
            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<SendIcon/>}
                    onClick={handleSend}
                >
                    Send
                </Button>
                </div>
            </Grid>
            {pred && (<Typography>Prediction: {pred}</Typography>)}
            {dataObj && (
                <Box mt={2}>
                    <Grid container alignItems="center">
                        <FormLabel>Number of events recorded: </FormLabel>
                        <Box ml={1}><Typography>{dataObj.dataArray.length}</Typography></Box>
                    </Grid>
                    <Box mt={1}>
                    <TextField
                        multiline
                        fullWidth
                        label="Data Object"
                        rows={10}
                        variant="outlined"
                        value={JSON.stringify(dataObj, null, 2) }
                    >

                    </TextField>
                    </Box>
                </Box>
            )}
        </div>
    );
}