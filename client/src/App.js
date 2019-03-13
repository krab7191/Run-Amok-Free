import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import EditableDataTable from './pages/EditableDataTable';
import Notes from './pages/Notes';
import ManageUsers from './pages/ManageUsers';
import Tasting from './pages/Tasting';
import ApiTest from './pages/ApiTest';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Nav from './components/Nav';
import { Provider, MyContext} from "./components/MyContext/MyContext";


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
            const { isLoggedIn } = context.myState;
            console.log(context);
            return(
              <Router>
                <div>
                  <Nav />
                    {isLoggedIn && (
                    <Switch>
                      <Route exact path="/" component={Tasting} />
                      <Route exact path="/Tasting" component={Tasting} />
                      <Route exact path="/ManageUsers" component={ManageUsers} />
                      <Route exact path="/EditableDataTable" component={EditableDataTable} />
                      <Route exact path="/Notes" component={Notes} />
                      <Route exact path="/ApiTest" component={ApiTest} />
                      <Route component={() => <Redirect to="/" />} />
                    </Switch>
                    )}
                    {!isLoggedIn && (
                    <Switch>
                      <Route exact path="/" component={SignIn} />
                      <Route exact path="/sign-in" component={SignIn} />
                      <Route exact path="/sign-up" component={SignUp} />
                      <Route component={() => <Redirect to="/" />} />
                    </Switch>
                    )}
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
