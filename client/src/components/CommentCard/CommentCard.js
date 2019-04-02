import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from '@material-ui/core/Divider';
import Typography from "@material-ui/core/Typography";

import Moment from "react-moment";

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
  content: {
    position: "relative"
  }
};

function CommentCard( props ) {
  const { classes } = props;

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.content}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.name}
        </Typography>
        <Divider className={classes.root} />
        <Typography className={classes.pos} color="textSecondary">
          {<Moment
                date={props.date}
                format="MMMM Do YYYY"
          />}
        </Typography>
        <Typography component="p">{props.comment}</Typography>
        <Typography component="p" />
      </CardContent>
    </Card>
  );
}

CommentCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CommentCard);
