import _ from 'lodash'
import React, { Component } from 'react';
import { Table, Header, Divider, Button, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

export default class AppointmentTable extends Component {
  state = {
    column: null,
    data: [],
    direction: null,
    user: this.props.location.state.id,
    row: {}
  }

  constructor(props) {
    super(props);
    this.passUser = this.passUser.bind(this);
    this.Remove = this.Remove.bind(this);
  }

  Remove = async (e, i) => {
    const { data } = this.state
    console.log(data[i])
    await this.setState({row: data[i]});
    this.callRemove();
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

  handleSort = (clickedColumn) => () => {
    const { column, data, direction } = this.state

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: _.sortBy(data, [clickedColumn]),
        direction: 'ascending',
      })

      return
    }

    this.setState({
      data: data.reverse(),
      direction: direction === 'ascending' ? 'descending' : 'ascending',
    })
  }

  async callRemove() {
    var user = this.state.row.user_id
    var fname = this.state.row.first_name
    var lname = this.state.row.last_name
    var loc = this.state.row.location
    var type = this.state.row.apt_type
    var time = this.state.row.apt_time
    var date = this.state.row.apt_date
    await fetch("http://localhost:9000/removeApt?user_id="+user+"&fname="+fname+"&lname="+lname+"&loc="+loc+"&type="+type+"&time="+time+"&date="+date,{
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
    await fetch("http://localhost:9000/getApts?user_id="+this.state.user, {
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
    const { column, data, direction } = this.state

    return (
      <>
        <Divider horizontal></Divider>
        <Container textAlign='left'>
          <Header as='h1'>Appointments</Header>
        </Container>
        <Divider horizontal></Divider>
        <Container>
          <Table sortable celled fixed>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell sorted = { column === 'name' ? direction : null } onClick = {this.handleSort('name')}>Name</Table.HeaderCell>
                <Table.HeaderCell sorted = { column === 'last' ? direction : null } onClick = {this.handleSort('last')}>Surname</Table.HeaderCell>
                <Table.HeaderCell sorted = { column === 'date' ? direction : null } onClick = {this.handleSort('date')}>Apt. Date</Table.HeaderCell>
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
        <Divider horizontal></Divider>
        <Container>
          <Button 
            fluid color='blue' 
            onClick={this.passUser}>
            Book Appointment
          </Button>
        </Container>
      </>
    );
  }
}