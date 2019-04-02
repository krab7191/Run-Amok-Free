import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Moment from "react-moment";

import GrowTextInput from "../GrowTextInput";
import "./TastingCard.css";

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin: "0 auto",
    padding: 0
  },
  actions: {
    display: "flex",
    padding: 0
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "grey"
  },
  content: {
    padding: "0 10px",
    height: "60px"
  },
  label: {
    fontSize: '0.9rem'
  }
});

class TastingCard extends React.Component {
  state = {
    expanded: false,
    inputOpen: false
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenNote = () => {
    this.setState(state => ({ inputOpen: !state.inputOpen }));
  };

  render() {
    const { classes, bev } = this.props;

    const renderCommentInput = (
      <GrowTextInput
        closeInput={this.handleOpenNote}
        checked={this.state.inputOpen}
        bev={bev}
      />
    );

    return (
      <div className="tastingCardDiv">
        <Card raised={true} className={classes.card}>
          <CardHeader
            avatar={<Avatar aria-label="Recipe" className={classes.avatar} />}
            title={this.props.bev.name}
            subheader={
              <Moment
                date={this.props.bev.dateUpdated}
                format="MMMM Do YYYY, h:mm a"
              />
            }
          />
          <CardContent className={classes.content}>
            <Typography component="p">{this.props.bev.description}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {!this.state.inputOpen ? (
              <IconButton className={classes.label} onClick={this.handleOpenNote} aria-label="Add A Note">
                Leave Note <ExpandMoreIcon />{" "}
              </IconButton>
            ) : (
              <IconButton onClick={this.handleOpenNote} aria-label="Add A Note">
                <ExpandLessIcon />{" "}
              </IconButton>
            )}
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            />
          </CardActions>
          {this.state.inputOpen ? renderCommentInput : null}
        </Card>
      </div>
    );
  }
}

TastingCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TastingCard);
