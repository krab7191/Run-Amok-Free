import React, { Component } from "react";

class ListOrder extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
    };
   
  }

  render() {
    return(
      <div>
        <h1>List Order</h1>
      </div>
    )
  }}

  export default ListOrder;

  // {ratingMean}
  // const ratingMean = (allBevs[0].ratings.reduce((a,b) => a + b, 0) / allBevs[0].ratings.length).toFixed(1);