import React, { Component } from "react";
import API from '../../utils/API';

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    allBevs: [],
    allAvailBevs: [],
    isLoading: true
  };

  componentWillMount() {
       this.getAllBevs(this.getAllAvailBev);
  }
    
  getAllBevs = (cb) => {
    API.getBevData()
      .then(res => {
        console.log(res);
        this.setState({
          // added .drinks because of initial seed data in getController
          allBevs: res.data,
          isLoading: false,
          // bevName: res.data.drinks.name,
          // bevComment:res.data.drinks.comment,
          // bevColor:res.data.drinks.color
        },() => {
          console.log("state ",this.state);
        })
      })
      .catch(err => console.log(err));
      cb();
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

  addNoteData = (note) => {
    console.log("Added: "+note);
    API.addNoteData({
      body: note
    })
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
