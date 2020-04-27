import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { Grid, TextField, Container, Button, Select, MenuItem, InputLabel } from '@material-ui/core';

const types = ["Check-Up", "Dental", "Physiotherapy", "Psychologist", "Surgery"];
const locations = [ "Barrie", "Newmarket", "Ottawa","Toronto", "Waterloo", "Woodbridge"];

export default function App() {
  return (
    <React.Fragment>
      <Container maxWidth="sm">
        <h1 style={{textAlign: "center"}}>Book Appointment</h1>
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
          <Grid item xs={12}>
            <InputLabel id="select-location">Location</InputLabel>
            <Select labelId="select-location" id="location" required fullWidth>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>
                  {loc}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id="select-appointment">Appointment Type</InputLabel>
            <Select labelId="select-appointment" id="appointment" required fullWidth>
              {types.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item xs={12} sm={6}>
              <KeyboardDatePicker
                disableToolbar
                required
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date"
                
                // onChange={handleChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>     
          </MuiPickersUtilsProvider>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="time"
              ampm={false}
              label="Time"
              type="time"
              margin="normal"
              defaultValue="08:00"
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 1800, 
              }}
            />
          </Grid>
          <Container>
            <Button fullWidth='true' variant="contained" color="primary" href="/Appointments">Submit</Button>
          </Container>
        </Grid>
      </Container>
    </React.Fragment>
  );
}