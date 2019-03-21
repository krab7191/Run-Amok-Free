import React, { Component } from "react";
import { MyContext } from "../../components/MyContext/MyContext";
import CommentCard from "../../components/CommentCard";
import NoteSort from '../../components/NoteSort';

import API from '../../utils/API';


const styles = {
  header: {
    textAlign:"-webkit-center"
  }
}
class Notes extends Component {

  state = {
    allNotes: [],
    bevNames: [],
    sort: "",
    sortedNotes: []
  };

  componentWillMount () {
    this.getNoteData(this.getBevNames);
  }

  filterBevNames = () => {
    let arr = [];
    this.state.allNotes.forEach(note => {
      if (arr.indexOf(note.beverages.name) === -1) {
        arr.push(note.beverages.name);  
      }
    });
    return arr;
  }

  getBevNames = () => {
    const bevArr = this.filterBevNames();
    console.log(bevArr);
    this.setState({bevNames: bevArr});
  }

  handleNotesSort = (sel) => {
    if (sel !== "All") {
      let sortArr = this.state.allNotes.filter(note => note.beverages.name === sel);
      this.setState({
        sortedNotes: sortArr
      })
    }
    else {
      this.setState({
        sortedNotes: this.state.allNotes
      })
    }
  }

  getNoteData = (cb) => {
    API.getNoteData()
      .then((res) => {
        this.setState({
          allNotes: res.data,
          sortedNotes: res.data,        
        },() => {
          console.log("state ",this.state);
          cb();
        })
      })
      .catch(err => console.log(err));
  }

  render() {
    return(
      <MyContext.Consumer>
        {context => {
            
            return(
              <div className="main">
                <h1 style={styles.header}>Notes</h1>
                <NoteSort bevNames={this.state.bevNames} sort={this.handleNotesSort} />
                {this.state.sortedNotes.map((comment,index)=> (
                  <CommentCard 
                    key={index} 
                    leftBy={comment.user ? comment.user.firstName : ""} 
                    name={comment.beverages.name} 
                    comment={comment.body} />
                ))}
              </div>
        )}}
      </MyContext.Consumer>
    )
  }}

  export default Notes;