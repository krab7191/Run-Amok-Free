import React, { Component } from "react";
import API from '../../utils/API';

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    isLoading: false,
    isAdmin: true,
    isLoggedIn: false,
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
          },
          handleSubmit: () => {
            this.setState({
              isLoggedIn: true
            },()=>{
              console.log(this.state);
            })
          },
          handleLogout: () => {
            this.setState({
              isLoggedIn: false
            },()=>{
              console.log(this.state)
            })
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
