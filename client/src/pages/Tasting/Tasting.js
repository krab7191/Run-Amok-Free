import React, { Component } from "react";
import TastingCard from "../../components/TastingCard";
import { Link } from "react-router-dom";
import { MyContext } from "../../components/MyContext/MyContext";
import API from "../../utils/API";

const styles = {
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
        this.setState(
          {
            allAvailBevs: res.data
          },
          () => {
            // console.log("state ", this.state);
          }
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    const allAvailBevs = this.state.allAvailBevs;

    return (
      <MyContext.Consumer>
        {context => {
          const { user } = context.myState;

          return (
            <div className="main">
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
                <div style={styles.tastingDiv}>
                  {allAvailBevs.map(bev => (
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
