import React, { Component } from "react";
import EditableDataTable from "../../components/EditableDataTable";
import { MyContext } from "../../components/MyContext/MyContext";

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <MyContext.Consumer>
        {context => {
          const { _id } = context.myState.user;
          return (
          <div className="main">
            <EditableDataTable type="users" userId={_id} />
          </div>
          )  
        }}
      </MyContext.Consumer>
    );
  }
}

export default UsersList;
