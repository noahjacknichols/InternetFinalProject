import React, { Component } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import { Grid, TextField, Container, Button, Select, MenuItem, InputLabel } from '@material-ui/core';

const types = ["Check-Up", "Dental", "Physiotherapy", "Psychologist", "Surgery"];
const locations = [ "Barrie", "Newmarket", "Ottawa","Toronto", "Waterloo", "Woodbridge"];

export default class BookAppointments extends Component {
  state = {
    date: new Date(),
    time: "08:00",
    fname: "",
    lname: "",
    l: "",
    t: "",
    user: this.props.location.state.id
  }
  
  constructor(props) {
    super(props);
    this.bookApt = this.bookApt.bind(this);
  }

  async bookApt() {
    if (this.state.fname === '') {
      alert("First Name field not Filled.")

    } else if (this.state.lname === '') {
      alert("Last Name field not Filled.")

    } else if (this.state.l === '') {
      alert("Location not selected.")

    } else if (this.state.t === '') {
      alert("Appointment Type not selected.")

    } else {
      console.log("Booking Appointment...")
      await this.callAPI()
    }
  }

  handleDate = (e) => this.setState({ date: e })
  handleLocation = (e) => this.setState({ l: e.target.value })
  handleFName = (e) => this.setState({ fname: e.target.value })
  handleLName = (e) => this.setState({ lname: e.target.value })
  handleType = (e) => this.setState({ t: e.target.value })
  handleTime = (e) => this.setState({ time: e.target.value })

  async callAPI() {
    var d = this.state.date.getDate();
    var m = this.state.date.getMonth() + 1;
    var y = this.state.date.getFullYear();
    var newDate = y + "-" + m + "-" + d;
    await fetch("http://3.135.225.224:9000/insertApt?user_id="+this.state.user+"&fname="+this.state.fname+"&lname="+this.state.lname+"&loc="+this.state.l+"&type="+this.state.t+"&time="+this.state.time+"&date="+newDate,{
    method: 'GET',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        if (response === "Failed") {
          alert("You have already booked that appointment!")

        } else {
          this.props.history.push({
            pathname: '/Appointments',
            state: {
                id: this.state.user
            }
        })
        }
    })
    .catch(function(error){
        console.log(error);
    })
    
  }
 
  render() {
    // const { date, time, l, t } = this.state;
    // console.log(this.state.user)
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
                onChange={this.handleFName}
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
                onChange={this.handleLName}
                fullWidth
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="select-location">Location</InputLabel>
              <Select labelId="select-location" id="location" value={this.state.l} onChange={this.handleLocation}required fullWidth>
                {locations.map((loc) => (
                  <MenuItem key={loc} value={loc}>
                    {loc}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <InputLabel id="select-appointment">Appointment Type</InputLabel>
              <Select labelId="select-appointment" id="appointment" value={this.state.t} onChange={this.handleType} required fullWidth>
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
                  format="yyyy-MM-dd"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date"
                  minDate={new Date()}
                  value={this.state.date}
                  onChange={this.handleDate}
                  onSelect={this.handleDate}
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
                label="Time"
                type="time"
                margin="normal"
                defaultValue={this.state.time}
                onChange={this.handleTime}
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
              <Button fullWidth variant="contained" color="primary" onClick={this.bookApt}>Submit</Button>
            </Container>
          </Grid>
        </Container>
      </React.Fragment>
    );
  }
}