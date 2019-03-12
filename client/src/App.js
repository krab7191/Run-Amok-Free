import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditableDataTable from './pages/EditableDataTable';
import Notes from './pages/Notes';
import ManageUsers from './pages/ManageUsers';
import Tasting from './pages/Tasting';
import ApiTest from './pages/ApiTest';
import NoMatch from './components/NoMatch';
import SignIn from './pages/SignIn';
import Nav from './components/Nav';
import { Provider} from "./components/MyContext/MyContext";


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
  
    };
   
  }

  render() {
    return (
      <Provider>
        <Router>
          <div>
            <Nav />
              <Switch>
                <Route exact path="/" component={Tasting} />
                <Route exact path="/Tasting" component={Tasting} />
                <Route exact path="/ManageUsers" component={ManageUsers} />
                <Route exact path="/EditableDataTable" component={EditableDataTable} />
                <Route exact path="/Notes" component={Notes} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/ApiTest" component={ApiTest} />
                <Route component={() => <NoMatch />} />
              </Switch>
          </div>
        </Router>  
      </Provider>
    );
  }
}

export default App;
