import { Box, Button, Divider, FormLabel, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import DialpadIcon from '@material-ui/icons/Dialpad';
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from "react-redux";
import { setTRainDelay, setTrainUrl, triggerTrain } from "../redux/ducks/TrainReducer";

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
    const dispatch = useDispatch();

    const [recording, setRecording] = React.useState(false);
    const [motionset, setMotionset] = React.useState("");
    const [key, setKey] = React.useState("");   


    const sendOrientation = process.env.REACT_APP_ORIENTATION === 'true' ? true : false;

    const nodeRedUrl = useSelector((state) => state.train.trainUrl);
    const delay = useSelector((state) => state.train.delay);
    const [dataObj, setDataObj] = React.useState({dataArray: []});

    const handleAcceleration = (event) => {
        console.log("Handle acceleration")
//        console.log(event);
        let now = new Date();
        if(recording) {
            var data = {
                device: "phone_1",
                figure: key,
                motionset: motionset,
                date: now.toISOString(),
                timestamp: now.getTime(),
                acceleration: {
                    x: event.acceleration.x,
                    y: event.acceleration.y,
                    z: event.acceleration.z
                },
            };
            console.log("length: " + dataObj.dataArray.length);
            let len = dataObj.dataArray.length;
            if (len > 0) {
                console.log("last " + dataObj.dataArray[len - 1].timestamp);
                let timeDiff = now - dataObj.dataArray[len - 1].timestamp;
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
        //console.log(event);
        //console.log(recording);
        let now = new Date();
        if(recording) {
            var data = {
                device: "phone_1",
                figure: key,
                motionset: motionset,
                date: now.toISOString(),
                timestamp: now.getTime(),
                orientation: {
                    alpha: event.alpha,
                    beta: event.beta,
                    gamma: event.gamma
                },
            };
            console.log("length: " + dataObj.dataArray.length);
            let len = dataObj.dataArray.length;
            if (len > 0) {
                console.log("last " + dataObj.dataArray[len - 1].timestamp);
                let timeDiff = now - dataObj.dataArray[len - 1].timestamp;
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
    
    const handleSend = () => {
        console.log("Send");
        dispatch(triggerTrain());
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
          }, [recording, dataObj]);

 
    return (
        <div>
            <Grid m={2} justifyContent="center" alignItems="center">
            <TextField
                required
                id="nrUrl"
                label="Node Red URL"
                value={nodeRedUrl}
                className={classes.textField}
                onChange={(e) => { dispatch(setTrainUrl(e.target.value)) }}
            />
            <TextField
                required
                type="number"
                id="delay"
                label="Delay between data points"
                value={delay}
                className={classes.textField}
                onChange={(e) => { dispatch(setTRainDelay(e.target.value)) }}
            />            <Box p={2}><Divider/></Box>
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