import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import EditableDataTable from './pages/EditableDataTable';
import GraphsStats from './pages/GraphsStats';
import ListOrder from './pages/ListOrder';
import SettingsPage from './pages/SettingsPage';
import StatsDataTable from './pages/StatsDataTable';
import Tasting from './pages/Tasting';
import ApiTest from './pages/ApiTest';
import NoMatch from './components/NoMatch';
import Nav from './components/Nav'
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
                <Route exact path="/" component={ListOrder} />
                <Route exact path="/ListOrder" component={ListOrder} />
                <Route exact path="/EditableDataTable" component={EditableDataTable} />
                <Route exact path="/GraphsStats" component={GraphsStats} />
                <Route exact path="/SettingsPage" component={SettingsPage} />
                <Route exact path="/StatsDataTable" component={StatsDataTable} />
                <Route exact path="/Tasting" component={Tasting} />
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
