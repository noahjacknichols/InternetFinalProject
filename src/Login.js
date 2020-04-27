import React, { Component } from 'react';

import { Grid, TextField, FormControlLabel, Checkbox, Container, Button, Box} from '@material-ui/core';

class Login extends Component {
    state = {
        email: '',
        password: '',
        apiResponse: '',
    }

    handleEmailChange = (e) => this.setState({
        email: e.target.value
    })

    handlePassChange = (e) => this.setState({
        password: e.target.value
    })

    constructor(props){
        super(props);
        this.validateLogin = this.validateLogin.bind(this);
    }
    validateLogin(){
        console.log("validating login..")
        console.log(this.state.email)
        if(this.state.email === ''){
            console.log("error on email")
        }else if(this.state.password === ''){
            //print out issue
            console.log("error on pass")
            // return <div>something went wrong...</div>
        }
        else{
            //query for the user in db
            console.log('verifying user..')
            this.callAPI();
            console.log(this.state.apiResponse)
            if(this.state.apiResponse != ''){
                this.props.history.push('/Login')
            }
            
        }
    
    }
    callAPI(){
        fetch("http://localhost:9000/isUser?user="+this.state.email+"&pass="+this.state.password)
          .then(res => res.text())
          .then(res => this.setState({ apiResponse: res}))
      }

    render(){
        return(
            <React.Fragment>
                <Container maxWidth="sm" justify="center">
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12} align="center"><h1>Login</h1></Grid>
                        
                        <Grid item xs={12}>
                        <TextField 
                            value={this.state.email}
                            onChange={this.handleEmailChange}
                            required id="email"
                            name="email"
                            label="Email"
                            fullWidth
                            
                            />
                        </Grid>
                        <Grid item xs={12}>
                        <TextField 
                            value={this.state.password}
                            onChange={this.handlePassChange}
                            fullWidth
                            required id="password"
                            name="password"
                            label="Password"
                            type="password"
                            
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button name="loginButton" variant="contained" color="primary" onClick={this.validateLogin} fullWidth>Submit</Button>
                        </Grid>
                    </Grid>
                    

                </Container>
            </React.Fragment>

        )
    }
}



export default Login;


