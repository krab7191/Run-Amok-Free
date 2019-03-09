import React, { Component } from "react";
import API from '../../utils/API';

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    allBevs: [],
    isLoading: true
  };

  componentWillMount() {
       this.getBevData();
  }
    
  getBevData = () => {
    API.getBevData()
      .then(res => {
        this.setState({
          // added .drinks because of initial seed data in getController
          allBevs: res.data.drinks,
          isLoading: false,
          // bevName: res.data.drinks.name,
          // bevComment:res.data.drinks.comment,
          // bevColor:res.data.drinks.color
        },() => {
          console.log("state ",this.state);
        })
      })
      .catch(err => console.log(err));
  }

  addNoteData = (data) => {
    console.log("Added: "+data);
    API.addNoteData(data)
      .then((res) => {
        this.getBevData();
      })
      .catch(err=>console.log(err));
  }

  render() {

    return (
      <MyContext.Provider
        value={{
          myState: this.state,
          postNote: (e,noteData) => {
            e.preventDefault();
            this.addNoteData(noteData);
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
