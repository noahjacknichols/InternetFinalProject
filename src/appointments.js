import _ from 'lodash'
import React, { Component } from 'react';
import { Table, Header, Divider, Button, Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const tableData = [
  { name: 'Nick', last: 'Ross', date: '2/26/2020', time: "12:39", type: 'Dental', remove: 'Remove'},
  { name: 'Noah', last: 'Nichols', date: '5/23/2020', time: "15:45", type: 'Physical', remove: 'Remove'},
  { name: 'Luke', last: 'Krete', date: '8/01/2020', time: "08:30", type: 'Surgery', remove: 'Remove'},
]

export default class AppointmentTable extends Component {
  state = {
    column: null,
    data: tableData,
    direction: null,
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

  handleClick = () => this.props.history.push('/appointments.js')

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
                <Table.HeaderCell>Remove Apt.</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {_.map(data, ({ name, last, date, time, type, remove }) => (
                <Table.Row key={name}>
                  <Table.Cell>{name}</Table.Cell>
                  <Table.Cell>{last}</Table.Cell>
                  <Table.Cell>{date}</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                  <Table.Cell>{type}</Table.Cell>
                  <Table.Cell selectable negative textAlign="center">
                    <a href="#">{remove}</a>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
        <Divider horizontal></Divider>
        <Container>
          <Button fluid color='blue'>
            New Appointment
          </Button>
        </Container>
      </>
    );
  }
}