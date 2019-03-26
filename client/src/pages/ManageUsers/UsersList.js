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