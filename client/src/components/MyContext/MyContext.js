import React, { Component } from "react";


const MyContext = React.createContext();

class Provider extends Component {
  state = {
    check: 'I am random stuff from MyContext'
  };

  render() {
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
