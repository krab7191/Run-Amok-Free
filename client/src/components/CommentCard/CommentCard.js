import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from "@material-ui/icons/Delete";

import Moment from "react-moment";
import { MyContext } from "../MyContext/MyContext";

const styles = {
  root: {
    width: '100%',
    margin: '5px 5px 5px 0',
    backgroundColor: 'darkgrey',
  },
  card: {
    maxWidth: "90%",
    margin: "15px auto"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 16,
    fontWeight: "bolder"
  },
  pos: {
    marginBottom: 12,
    top: "15px",
    right: "30px",
    fontSize: 14,
    fontWeight: "bolder"
  },
  delete: {
    position: 'absolute',
    marginBottom: 12,
    top: "5px",
    right: "20px",
    fontSize: 14,
    fontWeight: "bolder"
  },
  content: {
    position: "relative"
  }
};

class CommentCard extends React.Component {

  render () {
    return (
      <MyContext.Consumer>
        {context => { 
          
          const {
            classes,
            noteHandler,
            handleNotesSort,
            sortNameSel,
            _id,
            beverages,
            dateCreated,
            body
          } = this.props;

          const { deleteNote } = context;
          const userId = context.myState.user._id;
          const { isAdmin } = context.myState;
          
          return (
            <Card raised={true} className={classes.card}>
              <CardContent className={classes.content}>
                <Typography
                  className={classes.title}
                  color="textSecondary"
                  gutterBottom
                >
                  {beverages}
                </Typography>
                { isAdmin ?
                  <Tooltip title="Delete">
                    <IconButton
                      aria-label="Delete"
                      className={classes.delete} 
                      onClick={
                        (e) => deleteNote(e,_id,
                          () => noteHandler(userId,
                            () => handleNotesSort(sortNameSel)))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip> :
                  null }
                <Divider className={classes.root} />
                <Typography className={classes.pos} color="textSecondary">
                  {<Moment
                        date={dateCreated}
                        format="MMMM Do YYYY"
                  />}
                </Typography>
                <Typography component="p">{body}</Typography>
                <Typography component="p" />
              </CardContent>
            </Card>
          );
        }}
      </MyContext.Consumer>
    );
  }
}

CommentCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentCard);
