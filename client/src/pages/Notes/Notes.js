import React, { Component } from "react";
import { MyContext } from "../../components/MyContext/MyContext";
import CommentCard from "../../components/CommentCard";
import NoteSort from "../../components/NoteSort";

import API from "../../utils/API";

const styles = {
  header: {
    textAlign: "-webkit-center"
  }
};
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: [],
      bevNames: [],
      sort: "",
      sortedNotes: [],
      fetched: false
    };
  }

  filterBevNames = () => {
    let arr = [];
    this.state.allNotes.length > 0 &&
      this.state.allNotes.forEach(note => {
        if (arr.indexOf(note.beverages.name) === -1) {
          arr.push(note.beverages.name);
        }
      });
    return arr;
  };

  getBevNames = () => {
    const bevArr = this.filterBevNames();
    this.setState({ bevNames: bevArr });
  };

  handleNotesSort = sel => {
    if (sel !== "All") {
      let sortArr = this.state.allNotes.filter(
        note => note.beverages.name === sel
      );
      this.setState({
        sortedNotes: sortArr
      });
    } else {
      this.setState({
        sortedNotes: this.state.allNotes
      });
    }
  };

  getNoteData = (cb, userid) => {
    API.getNoteData(userid)
      .then(res => {
        this.setState(
          {
            allNotes: res.data,
            sortedNotes: res.data,
            fetched: true
          },
          () => {
            cb();
          }
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <MyContext.Consumer>
        {context => {
          const sortedNotes = this.state.sortedNotes;
          const { _id } = context.myState.user;

          this.state.allNotes.length === 0 &&
            this.state.fetched === false &&
            this.getNoteData(this.getBevNames, _id);

          return (
            <div className="main">
              <h1 style={styles.header}>Notes</h1>
              {this.state.allNotes.length > 0 && 
                this.state.bevNames && (
                  <NoteSort
                    bevNames={this.state.bevNames}
                    sort={this.handleNotesSort}
                  />
                )
              }
              {this.state.sortedNotes.length > 0 &&
                this.state.sortedNotes.map((comment, index) => (
                  <CommentCard
                    key={index}
                    leftBy={comment.user ? comment.user.firstName : ""}
                    name={comment.beverages.name}
                    comment={comment.body}
                  />
                ))}
              {sortedNotes.length === 0 && (
                <p className="text-center">
                  No notes yet! Time to have a tasting.
                </p>
              )}
            </div>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

export default Notes;
