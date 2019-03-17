import React, { Component } from "react";
import { MyContext } from "../../components/MyContext/MyContext";
import CommentCard from "../../components/CommentCard";

import API from '../../utils/API';


const styles = {
  header: {
    textAlign: "-webkit-center"
  }
}
class Notes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNotes: [
        {
          body: "I think this one is too tart. It won't appeal to many people",
          user: {
            firstName: "Karsten"
          }
        },
        {
          body: "This one is way too sweet. We should use more chicken stock in the next batch",
          user: {
            firstName: "Karsten"
          }
        },
        {
          body: "Perfect this one will be an instant hit.",
          user: {
            firstName: "Karsten"
          }
        }
      ]
    };
  }


  componentWillMount() {
    // this.getNoteData();
  }

  getNoteData = () => {
    API.getNoteData()
      .then((res) => {
        this.setState({
          allNotes: res.data
        }, () => {
          console.log("state ", this.state)
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return (

      <MyContext.Consumer>
        {context => {
          const allNotes = this.state.allNotes;

          return (
            <div>
              <h1 style={styles.header}>Notes</h1>
              {allNotes.map((comment, index) => (
                <CommentCard
                  key={index}
                  leftBy={comment.user ? comment.user.firstName : ""}
                  // name={comment.beverages.name}
                  comment={comment.body} />
              ))}
            </div>
          )
        }}
      </MyContext.Consumer>
    )
  }
}

export default Notes;