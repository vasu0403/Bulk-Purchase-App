import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'
import './App.css'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import Customer from './components/Customer'
import Vendor from './components/Vendor'

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      userEmail: ''
    }
  }
  componentDidMount() {
    this.setState({
      loggedIn: false,
      userEmail: ''
    })
  }
  render() {
    return (
      <Router>
        {/* <switch>
          <Route path = '/home'>
            hello
          </Route>
          <Route exact path = "/">
            <div className = 'outerGrid'>
              <div className = 'sideNav'>
                <div className = 'sideNav-links'>
                  <Link to="/signIn" className = 'btn btn-primary btn-lg' style={{color: 'white', textDecoration: 'none'}}>
                    SIGN IN
                  </Link>
                  <br/>
                  <br/>
                  <Link to="/signUp" className = 'btn btn-primary btn-lg' style={{color: 'white', textDecoration: 'none'}}>
                    REGISTER
                  </Link>
                  <br/>
                </div>
              </div>
              <div className = 'login'>
                <Route exact path = "/" component = {SignIn} />
                <Route path = '/signIn' component = {SignIn} />
                <Route path = '/signUp' component = {SignUp} />
              </div>
            </div>
          </Route> 
        </switch> */}
        <Route path = "/sign">
          <div className = 'outerGrid'>
            <div className = 'sideNav'>
              <div className = 'sideNav-links'>
                <Link to="/sign/signIn" className = 'btn btn-primary btn-lg' style={{color: 'white', textDecoration: 'none'}}>
                  SIGN IN
                </Link>
                <br/>
                <br/>
                <Link to="/sign/signUp" className = 'btn btn-primary btn-lg' style={{color: 'white', textDecoration: 'none'}}>
                  REGISTER
                </Link>
                <br/>
              </div>
            </div>
            <div className = 'login'>
              <Route exact path = "/sign" component = {SignIn} />
              <Route path = '/sign/signIn' component = {SignIn} />
              <Route path = '/sign/signUp' component = {SignUp} />
            </div>
          </div>
        </Route>
        <Route path = '/customer' component = {Customer} />
        <Route path = '/vendor' component = {Vendor} />
      </Router>
    )

  }
}

export default App;
