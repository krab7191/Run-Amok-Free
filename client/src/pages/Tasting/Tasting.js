import React, { Component } from "react";
import {MyContext} from "../../components/MyContext/MyContext";
import TastingCard from '../../components/TastingCard';

const styles = {
  tastingHeader: {
    textAlign: "center"
  },
  tastingDiv : {
    display: "flex",
    flexWrap: "wrap"
  }
} 

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
                  <h1 style={styles.tastingHeader}>Tasting</h1>
                  <div style={styles.tastingDiv}>
                    {allBevs.map(bev=>(
                      <TastingCard key={bev._id} name={bev.name} desc={bev.description}/>
                    ))}
                  </div>
                </div>
              )
          }}
      </MyContext.Consumer>
    )
  }
}

export default Tasting;