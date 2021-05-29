import React from "react";
import { AppBar, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import Train from "./components/Train";
import Score from "./components/Score";

function App() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [func, setFunc] = React.useState("train");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    console.log("Handle menu " + event.target.id);
    setFunc(event.target.id);

    setAnchorEl(null);

  };



  return (
    <div className="App">
      <Grid container direction="column" alignItems="stretch" spacing={1}>
        <Grid item>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick}>
                <MenuIcon />
              </IconButton>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem id="train" onClick={handleClose}>Train</MenuItem>
                  <MenuItem id="score" onClick={handleClose}>Score</MenuItem>
                  
                  
                </Menu> 
                <Typography variant="h6">
                Device Sensor Data
              </Typography>
            </Toolbar>
            </AppBar>
        </Grid>
        <Grid item>
          {func === 'train' ? (
            <Train/>
          ) : (
            <Score/>
          )}
          
        </Grid>
      </Grid>

    </div>

  );
}

export default App;
