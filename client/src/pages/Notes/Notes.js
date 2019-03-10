import React, { Component } from "react";
import { MyContext } from "../../components/MyContext/MyContext";
import CommentCard from "../../components/CommentCard";
import API from "../../utils/API";

class Notes extends Component {

  state = {
    notes: [] 
  };

  componentDidMount () {
    this.getNoteData();
  }

  getNoteData = () => {
    API.getNoteData()
      .then((res) => {
        this.setState({
          notes: res.data        
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return(

      <MyContext.Consumer>
        {context => {
            const { allBevs } = context.myState;
            
            return(
              <div>
                <h1 style={{textAlign:"-webkit-center"}}>Notes</h1>
                {this.state.notes.map((comment,index)=> (
                  <CommentCard key={index} name={comment.body} />
                ))}
              </div>
        )}}
      </MyContext.Consumer>
    )
  }}

  export default Notes;