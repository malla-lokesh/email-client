import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Components/Header';
import React from 'react';
import { Container } from 'react-bootstrap';
import Authentication from './Components/Authentication';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import WelcomePage from './Pages/WelcomePage';
import { useSelector } from 'react-redux';

function App() {
  const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);

  return (
    <Container fluid>
      <Router>
        <Header/>
        <Switch>
          <Route path='/' exact>
            {isLoggedIn ? <Redirect to='/welcome' /> : <Redirect to='/authentication' />}
          </Route>
          <Route path='/authentication'>
            {!isLoggedIn ? <Authentication/> : <Redirect to='/welcome' />}
          </Route>
          <Route path='/welcome'>
            {isLoggedIn ? <WelcomePage/> : <Redirect to='/authentication' />}
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
