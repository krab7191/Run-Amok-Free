import React, { Component } from "react";
import API from '../../utils/API';
import AUTH from '../../utils/AUTH';

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    isLoading: false,
    isAdmin: true,
    isLoggedIn: false,
    isRegistered: false,
    loginAttempt: false,
    user: ""
  };

  componentWillMount() {
  }

  render() {

    return (
      <MyContext.Provider
        value={{
          myState: this.state,
          postNote: (e,id,noteData) => {
            e.preventDefault();
            API.addNoteData({
              body: noteData,
              beverages: id
            })
              .then((res) => {
                console.log(`Added! ${res.data.body}`);
              })
              .catch(err=>console.log(err));
          },
          handleSignInSubmit: (userData) => {
            console.log(userData.email);
            AUTH.logIn(userData.email,userData.password)
              .then((res) => {
                console.log(`Logged in: ${res.data.user}`);
                if (response.status === 200) {
                  // update the state
                  this.setState({
                    isLoggedIn: true,
                    user: response.data.user
                  });
                }
              })
              .catch(err => {
                console.log("Failure");
                  // alert("Incorrect User id or Password. Please try again.");
                  this.setState({loginAttempt:true});
                  console.log(this.state);
               });
          },
          handleRegisterSubmit: (userData) => {
            API.registerUser({
              createdOn: Date.now(),
              ...userData
            })
              .then((res) => {
                console.log(`Added user: ${res.data._id}`);
                this.setState({
                  isRegistered: true
                })
              })
              .catch(err => console.log(err));
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
