import React, { Component } from 'react';

import { Grid, TextField, Container, Button, Paper, withStyles } from '@material-ui/core';
import { Segment, Header } from 'semantic-ui-react';
const styles = theme => ({
    padding: {
        width: "45em", height: "14em",
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }

});

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
        // this.callAPI = this.callAPI.bind(this);
    }
    async validateLogin(){
        console.log("validating login..")
        console.log(this.state.email)
        if(this.state.email === ''){
            alert("Invalid Email")
        }else if(this.state.password === ''){
            //print out issue
            alert("Invalid Password")
            // return <div>something went wrong...</div>
        }
        else{
            //query for the user in db
            console.log('verifying user..')
            await this.callAPI();
            console.log("apiResponse:")
            console.log(this.state.apiResponse)
            if(this.state.apiResponse !== ''){
                console.log()
                this.props.history.push({
                    pathname: '/Appointments',
                    state: {
                        id: this.state.apiResponse
                    }
                })
            }
            
        }
    
    }
    async callAPI(){
        await fetch("http://3.135.225.224:9000/isUser?user="+this.state.email+"&pass="+this.state.password, {
        method: 'GET',
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response[0].id)
            if(response !== []){
                this.setState({apiResponse: response[0].id});
            }
        })
        .catch(function(error){
            console.log(error);
        })
        
        
      }

    render(){
        const { classes } = this.props;
        
        return(
            <React.Fragment>
                <Segment inverted textAlign='center' style={{ minHeight: 900, padding: '1em 0em' }} vertical>
                    <Header as='h1' inverted style={{fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '4em'}}>Login</Header>
                    <Paper className={classes.padding}>
                        <Container maxWidth="sm" justify="center">
                            <Grid container spacing={3} justify="center">
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
                    </Paper>
                </Segment>
            </React.Fragment>

        )
    }
}



export default withStyles(styles) (Login);


