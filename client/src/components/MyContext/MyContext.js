import React, { Component } from "react";
import API from '../../utils/API';

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    check: 'I am random stuff from MyContext',
    allBevs: [],
  
  };

  componentDidMount() {
       this.getBevData();
     }
    
    
      getBevData = () => {
        API.getBevData()
            .then(res => {
                this.setState({
                  // added .drinks because of initial seed data in getController
                    allBevs: res.data.drinks,
                    // bevName: res.data.drinks.name,
                    // bevComment:res.data.drinks.comment,
                    // bevColor:res.data.drinks.color
                  });
                  console.log(res.data)
              })
            .catch(err => console.log(err));
            }

  render() {
    console.log("state ", this.state)
    return (
      <MyContext.Provider
        value={{
          check: this.state.check,
        }}
      >
        {this.props.children}
      </MyContext.Provider>
    );
  }
}

export { Provider, MyContext };
