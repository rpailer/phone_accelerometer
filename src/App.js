import React from "react";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import ContentPane from "./components/ContentPane";

function App() {

  


  return (
    <div className="App">
      <Grid container direction="column" alignItems="stretch" spacing={1}>
        <Grid item>
          <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6">
                Device Sensor Data
              </Typography>
            </Toolbar>
            </AppBar>
        </Grid>
        <Grid item>
          <ContentPane/>
        </Grid>
      </Grid>

    </div>

  );
}

export default App;
