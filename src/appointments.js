import _ from 'lodash'
import React, { Component } from 'react';
import { Table, Header, Divider, Button, Container, Segment } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class AppointmentTable extends Component {
  state = {
    data: [],
    user: this.props.location.state.id,
    row: {}
  }

  constructor(props) {
    super(props);
    this.passUser = this.passUser.bind(this);
    this.Remove = this.Remove.bind(this);
    this.Logout = this.Logout.bind(this);
  }

  Remove = async (e, i) => {
    const { data } = this.state
    console.log(data[i])
    await this.setState({row: data[i]});
    this.callRemove();
  }

  async Logout () {
    this.props.history.push('/')
  }

  async passUser() {
    console.log("passing user...")
    this.props.history.push({
      pathname: '/BookAppointment',
      state: {
        id: this.state.user
      }
    })
  }

  componentWillMount() {
    this.callInsert();
  }

  async callRemove() {
    var user = this.state.row.user_id
    var fname = this.state.row.first_name
    var lname = this.state.row.last_name
    var loc = this.state.row.location
    var type = this.state.row.apt_type
    var time = this.state.row.apt_time
    var date = this.state.row.apt_date
    await fetch("http://3.135.225.224:9000/removeApt?user_id="+user+"&fname="+fname+"&lname="+lname+"&loc="+loc+"&type="+type+"&time="+time+"&date="+date,{
    method: 'GET',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        window.location.reload();
    })
    .catch(function(error){
        console.log(error);
    })  
  }

  async callInsert() {
    await fetch("http://3.135.225.224:9000/getApts?user_id="+this.state.user, {
    method: 'GET',
        dataType: 'json',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        console.log(response)
        this.setState({data: response});
    })
    .catch(function(error){
        console.log(error);
    })
    
  }

  render() {
    const { data } = this.state

    return (
      <Segment inverted textAlign='center' style={{ minHeight: 860, padding: '1em 0em' }} vertical>
        <Divider horizontal></Divider>
        <Container textAlign='left'>
          <Header as='h1' inverted>Appointments</Header>
        </Container>
        <Divider horizontal></Divider>
        <Container>
          <Table celled fixed striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Surname</Table.HeaderCell>
                <Table.HeaderCell>Apt. Date</Table.HeaderCell>
                <Table.HeaderCell>Apt. Time</Table.HeaderCell>
                <Table.HeaderCell>Apt. Type</Table.HeaderCell>
                <Table.HeaderCell>Location</Table.HeaderCell>
                <Table.HeaderCell>Remove Apt.</Table.HeaderCell>
                
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ first_name, last_name, apt_date, apt_time, apt_type, location }, i) => (
                <Table.Row key={i}>
                  <Table.Cell>{first_name}</Table.Cell>
                  <Table.Cell>{last_name}</Table.Cell>
                  <Table.Cell>{apt_date}</Table.Cell>
                  <Table.Cell>{apt_time}</Table.Cell>
                  <Table.Cell>{apt_type}</Table.Cell>
                  <Table.Cell>{location}</Table.Cell>
                  <Table.Cell selectable negative textAlign="center" onClick={e => this.Remove(e, i)}>
                    Remove
                  </Table.Cell> 
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
        <Container>
          <Button fluid color='blue' onClick={this.passUser} style={{ marginTop: "1em"}}>
            Book Appointment
          </Button>
          <Button fluid color='red' onClick={this.Logout} style={{ marginTop: "1em"}}>
            Logout
          </Button>
        </Container>
      </Segment>
    );
  }
}