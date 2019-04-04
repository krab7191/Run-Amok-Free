import React, { Component } from "react";
import { MyContext } from "../../components/MyContext/MyContext";
import CommentCard from "../../components/CommentCard";
import NoteSort from "../../components/NoteSort";
import dateTime from "../../utils/dateTime";

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
      sortNames: [],
      sortType: "Date Left",
      sortedNotes: [],
      fetched: false,
      sortNameSel: 'All',
    };
  }

  filterSortData = () => {
    let arr = [];
    this.state.allNotes.length > 0 &&
      this.state.allNotes.forEach(note => {
        if (this.state.sortType === 'Date Left') {
          if (arr.indexOf(dateTime.makeDateReadable(note.dateCreated)) === -1) {
            arr.push(dateTime.makeDateReadable(note.dateCreated));
          }
        } 
        else {
          if (arr.indexOf(note.beverages) === -1) {
            arr.push(note.beverages);
          }
        }
      });
    return arr;
  };

  getSortNames = () => {
    const sortArr = this.filterSortData();
    this.setState({ sortNames: sortArr });
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value }, () => {
      this.handleNotesSort(this.state.sortNameSel);
    });
  };

  handleSortType = () => {
    this.setState({
      sortType: this.state.sortType === "Date Left" ? "Mead Name" : "Date Left"
    },
    () => {
      this.setState(
        {
          sortedNotes: this.state.allNotes
        },
        () => this.getSortNames()
      );
    });
  }

  handleNotesSort = sel => {
    if (sel !== "All") {
      let sortArr = this.state.allNotes.filter(note => 
        this.state.sortType === 'Date Left' ? 
          dateTime.makeDateReadable(note.dateCreated) === sel :
          note.beverages === sel
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

  getNoteData = (userid,cb) => {
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

  noteHandler = (id,cb) => {
    this.getNoteData(id,cb);
  }

  render() {
    return (
      <MyContext.Consumer>
        {context => {
          const sortedNotes = this.state.sortedNotes;
          const { _id } = context.myState.user;

          this.state.allNotes.length === 0 &&
            this.state.fetched === false &&
            this.noteHandler(_id,this.getSortNames);

          return (
            <div className="main">
              <h1 style={styles.header}>Tasting Notes</h1>
              {this.state.allNotes.length > 0 && this.state.sortNames && (
                <NoteSort
                  changeType={this.handleSortType}
                  sortNameSel={this.state.sortNameSel}
                  sortType={this.state.sortType}
                  sortData={this.state.sortNames}
                  handleChange={this.handleChange}
                />
              )}
              {this.state.sortedNotes.length > 0 &&
                this.state.sortedNotes.map((comment, index) => (
                  <CommentCard
                    key={index}
                    handleNotesSort={this.handleNotesSort}
                    noteHandler={this.noteHandler}
                    sortNameSel={this.state.sortNameSel}
                    {...comment}
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
