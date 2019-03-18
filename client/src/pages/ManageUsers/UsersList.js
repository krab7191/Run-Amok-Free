import React, { Component } from "react";
import EditableDataTable from "../../components/EditableDataTable";

class UsersList extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
    };
   
  }

  render() {
    return(
      <EditableDataTable type="users" />
    )
  }}

  export default UsersList;

  // {ratingMean}
  // const ratingMean = (allBevs[0].ratings.reduce((a,b) => a + b, 0) / allBevs[0].ratings.length).toFixed(1);