import React, { Component } from 'react';

import './App.css';
import { Grid, TextField, FormControlLabel, Checkbox, Container, Button} from '@material-ui/core';
import history from './history';
import { Redirect, withRouter, Route, Switch, Router } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';


class SignIn extends Component {
  constructor(props) {
    super(props);
    // this.callAPI = this.callAPI.bind(this);
    this.state = { apiResponse: ""};

  }
  // callAPI(){
  //   console.log("fetching..")
  //   fetch("http://localhost:9000/getUsers")
  //         .then(function(response){
  //             console.log(response);
  //             return response.json();

  //         })
  //       //   .then(res=> console.log("res is:" + res))
  //         .then(function(jsonData) {
  //             return JSON.stringify(jsonData);
  //         })
  //         .then(function(jsonStr){
  //           this.setState({ apiResponse: jsonStr})
  //           console.log("response:" + jsonStr);
  //         })
  // }
  componentWillMount(){
    // this.callAPI();
  }
  
  render (){
    return(
    <React.Fragment>
      
      <p className="test-p">{this.state.apiResponse}</p>
      <Container maxWidth="sm">
        <h1>Sign-Up</h1>
        <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField 
                    required id="userName"
                    name="userName"
                    label="Username"
                    fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                  <TextField 
                    fullWidth
                    required id="password"
                    name="password"
                    label="Password"
                    />
                </Grid>
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
                  <TextField
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="billing address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="billing address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField id="state" name="state" label="State/Province/Region" fullWidth />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="zip"
                    name="zip"
                    label="Zip / Postal code"
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                    label="Agree to Terms & Conditions"
                  />
                </Grid>
                {/* <Link to='/signIn'> */}
                <Button variant="contained" color="primary" href="/Login">Submit</Button>
                {/* </Link> */}
              </Grid>
            </Container>
            {/* <BrowserRouter>
                <Router>
                    <Switch>
                    <Route path="/" exact component = {App} />
                    <Route path="/signIn" component = {signIn}/>
                    </Switch>
                </Router>
            </BrowserRouter> */}
          </React.Fragment>
          
    )
  }
}


// export function redir() {
//   return <Redirect to="/signIn"/>
// }


export function checkData(){
  
}

export default SignIn;

