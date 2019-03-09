import React, { Component } from "react";
import { MyContext } from "../../components/MyContext/MyContext";
import CommentCard from "../../components/CommentCard";

class Notes extends Component {

 
  constructor(props) {
    super(props);

    this.state = {
    };
   
  }

  render() {
    return(

      <MyContext.Consumer>
        {context => {
            const { allBevs } = context.myState;
            const commentsArr = []
            for (let i = 0; i < 6; i++) {
              commentsArr.push(allBevs[0].name)
            }
            return(
              <div>
                <h1 style={{textAlign:"-webkit-center"}}>Comments</h1>
                {commentsArr.map((comment,index)=> (
                  <CommentCard key={index} name={comment} />
                ))}
              </div>
        )}}
      </MyContext.Consumer>
    )
  }}

  export default Notes;