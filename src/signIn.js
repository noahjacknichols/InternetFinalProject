import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Grid, TextField, FormControlLabel, Checkbox, Container, Button} from '@material-ui/core';
function App() {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <h1>Sign-Up</h1>
        <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First name"
                    fullWidth
                    autoComplete="fname"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    fullWidth
                    autoComplete="lname"
                  />
                </Grid>
                <Button variant="contained" color="primary" href="#contained-buttons">Submit</Button>
              </Grid>
            </Container>
          </React.Fragment>
  );
}

export default App;
