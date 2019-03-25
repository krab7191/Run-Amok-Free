import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import Footer from './components/Footer';
import ManageBevs from './pages/ManageBevs';
import Notes from './pages/Notes';
import ManageUsers from './pages/ManageUsers';
import Tasting from './pages/Tasting';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nav from './components/Nav';
import { Provider, MyContext} from "./components/MyContext/MyContext";

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
  
    };
   
  }

  render() {
    return (
      <Provider>
        <MyContext.Consumer>
          {context => {
            const { isLoggedIn,isRegistered } = context.myState;
            return(
              <Router>
                <div className='section'>
                  <Nav />
                    {isLoggedIn && (
                    <Switch>
                      <Route exact path="/" component={Tasting} />
                      <Route exact path="/Tasting" component={Tasting} />
                      <Route exact path="/ManageUsers" component={ManageUsers} />
                      <Route exact path="/ManageBevs" component={ManageBevs} />
                      <Route exact path="/Notes" component={Notes} />
                      <Route component={() => <Redirect to="/" />} />
                    </Switch>
                    )}
                    {!isLoggedIn && (
                    <Switch>
                      <Route exact path="/" component={SignIn} />
                      <Route exact path="/sign-in" component={SignIn} />
                      {!isRegistered && (<Route exact path="/sign-up" component={SignUp} />)}
                      <Route component={() => <Redirect to="/" />} />
                    </Switch>
                    )}
                  <Footer />
                </div>
              </Router> 
            )
          }} 
        </MyContext.Consumer>
      </Provider>
    );
  }
}

export default App;
