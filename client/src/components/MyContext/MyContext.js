import React, { Component } from "react";
import API from '../../utils/API';

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    isLoading: false,
    isAdmin: true,
  };

  componentWillMount() {
  }

  addNoteData = (id,note) => {
    API.addNoteData({
      body: note,
      beverages: id
    })
      .then((res) => {
        console.log(`Added! ${res.data.body}`);
      })
      .catch(err=>console.log(err));
  }

  render() {

    return (
      <MyContext.Provider
        value={{
          myState: this.state,
          postNote: (e,id,noteData) => {
            e.preventDefault();
            this.addNoteData(id,noteData);
          }
        }}
      > 
        { !this.state.isLoading && 
          this.props.children
        }
      </MyContext.Provider>
    )
  }
}

export { Provider, MyContext };
