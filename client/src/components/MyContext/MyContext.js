import React, { Component } from "react";
import API from '../../utils/API';

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    allBevs: [],
    isLoading: true
  };

  componentWillMount() {
       this.getAllBevs();
  }
    
  getAllBevs = () => {
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
