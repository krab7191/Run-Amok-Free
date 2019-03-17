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
    AUTH.getUser().then(res => {
      console.log(res.data);
			if (!!res.data.user) {
				this.setState({
					isLoggedIn: true,
          loginAttempt: false,
          isAdmin: res.data.user.isAdmin,
					user: res.data.user
        });
      }
      else {
        this.setState({
					isLoggedIn: false,
					loginAttempt: 0,
					user: null
				});
      }
      })
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
              beverages: id,
              user: this.state.user._id
            })
              .then((res) => {
                console.log(`Added! ${res.data.body}`);
              })
              .catch(err=>console.log(err));
          },
          handleSignInSubmit: (userData) => {
            AUTH.login(userData)
              .then((res) => {
                console.log(`Logged in: ${res.data.user.firstName}`);
                if (res.status === 200) {
                  // update the state
                  this.setState({
                    isLoggedIn: true,
                    isAdmin: res.data.user.isAdmin,
                    user: res.data.user
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
            AUTH.register({
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
            AUTH.logout().then((value) => {
              this.setState({
                isLoggedIn: false,
              },()=>{
                console.log(this.state)
              })
            })
            .catch((err) => {console.log(err)})
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
