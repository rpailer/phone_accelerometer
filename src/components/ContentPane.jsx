import { Button, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

export default function ContentPane () {
    const classes = useStyles();
    console.log("Content Pane");
    const [recording, setRecording] = React.useState(false);

    const handleAcceleration = (event) => {
        console.log("Handle acceleration")
        console.log(event);
    }

    const handleOrientation = (event) => {
        console.log("handle orientation");
        console.log(event);       
    }

    useEffect(() => {
        console.log("Use effect");  
        window.addEventListener('devicemotion', handleAcceleration)
        window.addEventListener('deviceorientation', handleOrientation)
            return () => {
                window.removeEventListener('devicemotion', handleAcceleration)
                window.removeEventListener('deviceorientation', handleOrientation)
                    };
          }, []);

    const handleStart = () => {
        console.log("Start");
        setRecording(true);
//        window.addEventListener('devicemotion', handleAcceleration)
//        window.addEventListener('deviceorientation', handleOrientation)
    };

    const handleStop = () => {
        console.log("Stop");
        setRecording(false);
        // window.removeEventListener('devicemotion', handleAcceleration)
        // window.removeEventListener('deviceorientation', handleOrientation)
    };



    return (
        <div>
            <Typography>Sensor Data</Typography>
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
 
        </div>
    );
}