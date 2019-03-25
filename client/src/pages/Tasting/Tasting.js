import React, { Component } from "react";
import TastingCard from "../../components/TastingCard";
import { Link } from "react-router-dom";
import { MyContext } from "../../components/MyContext/MyContext";
import API from "../../utils/API";

const styles = {
  tastingHeader: {
    textAlign: "center"
  },
  tastingDiv: {
    display: "flex",
    flexWrap: "wrap"
  }
};

class Tasting extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allAvailBevs: []
    };
  }

  componentWillMount() {
    this.getAllAvailBev();
  }

  getAllAvailBev = () => {
    API.getAvailBevData()
      .then(res => {
        console.log(res);
        this.setState(
          {
            // added .drinks because of initial seed data in getController
            allAvailBevs: res.data
            // bevName: res.data.drinks.name,
            // bevComment:res.data.drinks.comment,
            // bevColor:res.data.drinks.color
          },
          () => {
            console.log("state ", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    const allAvailBevs = this.state.allAvailBevs;
    console.log(allAvailBevs);

    return (
      <MyContext.Consumer>
        {context => {
          const { user } = context.myState;
          console.log(user);

          return (
            <div className='main'>
              {/* <h1 style={styles.tastingHeader}>Tasting</h1> */}
              {allAvailBevs.length === 0 && (
                <p className="text-center">
                  There aren't any beverages to taste! It's time to go brew
                  some.&nbsp;
                  {user.isAdmin && (
                    <>
                      Manage beverages <Link to="/ManageBevs">here</Link>.
                    </>
                  )}
                </p>
              )}
              {/* If admin, link to bev mgmt and say create some. */}

              <div className="main">
                <h1 style={styles.tastingHeader}>Tasting</h1>
                <div style={styles.tastingDiv}>
                  {allAvailBevs.map(bev=>(
                    <TastingCard key={bev._id} bev={bev} />
                  ))}
                </div>
              </div>
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

export default Tasting;
