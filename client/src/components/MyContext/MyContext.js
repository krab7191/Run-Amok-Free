import React, { Component } from "react";
import API from "../../utils/API";
import AUTH from "../../utils/AUTH";

// Toast notification
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const MyContext = React.createContext();

class Provider extends Component {
  state = {
    isLoading: false,
    isAdmin: false,
    isLoggedIn: false,
    isRegistered: false,
    loginAttempt: false,
    user: ""
  };

  componentWillMount() {
    AUTH.getUser().then(res => {
      if (!!res.data.user) {
        this.setState({
          isLoggedIn: true,
          loginAttempt: false,
          isAdmin: res.data.user.isAdmin,
          user: res.data.user
        });
      } else {
        this.setState({
          isLoggedIn: false,
          loginAttempt: 0,
          user: null
        });
      }
    });
  }

  // type one of 'success', 'error', 'info', duration in MS
  notify = (text, type, duration) => {
    toast[type || "success"](text, { autoClose: duration || 2500 });
  };

  render() {
    return (
      <MyContext.Provider
        value={{
          myState: this.state,
          deleteNote: (e, id, cb) => {
            e.preventDefault();
            API.deleteNote(id)
              .then(res => {
                this.notify(`Deleted ${res.data} note!`);
              })
              .catch(err => {
                console.log(err);
                this.notify("Error deleting note... Please try again.", "error");
              });
          },
          postNote: (e, beverageName, noteData) => {
            e.preventDefault();
            API.addNoteData({
              body: noteData,
              beverages: beverageName,
              user: this.state.user._id
            })
              .then(res => {
                this.notify("Note saved!", "success");
              })
              .catch(err => {
                console.log(err);
                this.notify("Error adding note... Please try again.", "error");
              });
          },
          handleSignInSubmit: userData => {
            this.notify("Logging in...", "info", 800);
            AUTH.login(userData)
              .then(res => {
                if (res.status === 200) {
                  this.setState({
                    isLoggedIn: true,
                    isAdmin: res.data.user.isAdmin,
                    user: res.data.user
                  });
                }
              })
              .catch(err => {
                this.notify(
                  `Username, email, or password incorrect. Please try again.`,
                  "error"
                );
                this.setState({ loginAttempt: true });
              });
          },
          handleRegisterSubmit: userData => {
            this.notify("Signing up...", "info", 1500);
            AUTH.register({
              createdOn: Date.now(),
              ...userData
            })
              .then(res => {
                if (res.status === 200) {
                  this.notify("Success!");
                  this.setState({
                    isRegistered: true
                  });
                } else {
                  this.notify(res.response.data.error);
                }
              })
              .catch(err => {
                if (err.response.data.Error) {
                  this.notify(err.response.data.Error, "error", 3500);
                } else {
                  this.notify("An error ocurred...", "error", 1500);
                  console.log(err);
                }
              });
          },
          handleLogout: () => {
            this.notify("Logging you out...", "info", 1500);
            AUTH.logout()
              .then(value => {
                this.setState({
                  isLoggedIn: false,
                  isAdmin: false,
                  user: ""
                });
              })
              .catch(err => {
                this.notify("Error logging out", "error", 2000);
                console.log(err);
              });
          }
        }}
      >
        {!this.state.isLoading && this.props.children}
        <ToastContainer />
      </MyContext.Provider>
    );
  }
}

export { Provider, MyContext };
