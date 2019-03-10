import React, { Component } from "react";
import {MyContext} from "../../components/MyContext/MyContext";
import TastingCard from '../../components/TastingCard';

class Tasting extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
    };
   
  }

  render() {
    return (
      <MyContext.Consumer>
          {context => {
              const { allBevs } = context.myState;
              console.log(allBevs);

              return(
                <div>
                  <h1 style={{textAlign: "-webkit-center"}}>Tasting</h1>
                  {allBevs.map(bev=>(
                    <TastingCard key={bev._id} name={bev.name} desc={bev.description}/>
                  ))}
                </div>
              )
          }}
      </MyContext.Consumer>
    )
  }
}

export default Tasting;