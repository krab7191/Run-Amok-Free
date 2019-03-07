import React, { Component } from "react";
import { MyContext } from "../../components/MyContext/MyContext";


class Comments extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
    };
   
  }

  render() {
    return(

      <MyContext.Consumer>
      {value => {
          const { allBevs , check } = value.myState;
          return(
      <div>
        <h1>{check}</h1>
      </div>
      )}}
      </MyContext.Consumer>
    )
  }}

  export default Comments ;