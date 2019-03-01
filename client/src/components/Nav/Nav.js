import React from 'react';
// import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import './Nav.css'
class Nav extends React.Component {
  state = {
  
  };

  render() {
    // const { anchorEl } = this.state;

    return (
      <React.Fragment>
      <div className="navbar">
      <div className="dropdown">
        <button className="dropbtn">Dropdown 
          <i className="fa fa-caret-down"></i>
        </button>
        <div className="dropdown-content">
          <Link to="/Tasting">Tasting</Link>
          <Link to="/">List</Link>
          <Link to="/EditableDataTable">EditableDataTable</Link>
          <Link to="/StatsDataTable">StatsDataTable</Link>
          <Link to="/GraphsStats">Graphs and Stats</Link>
          <Link to="/SettingsPage">SettingsPage</Link>
          {/* <a href="#">Link 2</a>
          <a href="#">Link 3</a> */}
        </div>
      </div> 
    </div>
    </React.Fragment>
    );
  }
}

export default Nav;
