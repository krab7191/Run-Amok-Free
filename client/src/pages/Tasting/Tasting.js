import React, { Component } from "react";
import TastingCard from '../../components/TastingCard';

class Tasting extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
    };
   
  }

  render() {
    return(
      <div>
        <h1>Tasting</h1>
        <TastingCard/>
      </div>
    )
  }}

  export default Tasting;