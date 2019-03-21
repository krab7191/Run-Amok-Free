import React, { Component } from "react";
import TastingCard from '../../components/TastingCard';

import API from '../../utils/API';

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
      allAvailBevs: []
    };
   
  }

  componentWillMount () {
    this.getAllAvailBev();
  }

  getAllAvailBev = () => {
    API.getAvailBevData()
      .then(res => {
        console.log(res);
        this.setState({
          // added .drinks because of initial seed data in getController
          allAvailBevs: res.data,
          // bevName: res.data.drinks.name,
          // bevComment:res.data.drinks.comment,
          // bevColor:res.data.drinks.color
        },() => {
          console.log("state ",this.state);
        })
      })
      .catch(err => console.log(err));
  }

  render() {
      const allAvailBevs = this.state.allAvailBevs;
      console.log(allAvailBevs);

      return(
        <div className="main">
          <h1 style={styles.tastingHeader}>Tasting</h1>
          <div style={styles.tastingDiv}>
            {allAvailBevs.map(bev=>(
              <TastingCard 
                key={bev._id} 
                bev={bev} />
            ))}
          </div>
        </div>
      )
  }
}

export default Tasting;