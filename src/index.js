import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import SignIn from './signIn';
import 'semantic-ui-css/semantic.min.css'
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Login from "./Login"
import HomePage from "./HomepageLayout";
import Appointments from "./appointments";
import BookAppointments from "./bookappointment";

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePage}/>
      <Route path="/Login" component={Login}/>
      <Route path="/SignIn" component={SignIn}/>
      <Route path="/Appointments" component={Appointments}/>
      <Route path="/BookAppointment" component={BookAppointments}/>
    </div> 
  </Router>
)

ReactDOM.render(
    routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
