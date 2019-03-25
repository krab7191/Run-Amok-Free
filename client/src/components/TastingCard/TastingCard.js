import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddNoteIcon from '@material-ui/icons/NoteAddTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import CancelIcon from '@material-ui/icons/Cancel';
import Moment from 'react-moment';

import GrowTextInput from "../GrowTextInput";
import './TastingCard.css';

const styles = theme => ({
  card: {
    maxWidth: 400,
    margin:"0 auto"
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: "grey",
  },
});

class TastingCard extends React.Component {
  state = { 
    expanded: false,
    inputOpen: true
   };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenNote = () => {
    this.setState(state => ({ inputOpen: !state.inputOpen }));
  }

  render() {
    const { classes, bev } = this.props;

    const renderCommentInput = (
      <GrowTextInput 
        closeInput={this.handleOpenNote} 
        // postNoteHandler={postNote} 
        checked={this.state.inputOpen}
        bev={bev}>
      </GrowTextInput>
    );

    return (
      <div className="tastingCardDiv">
        <Card raised={true} className={classes.card}>
          <CardHeader
            avatar={
              <Avatar aria-label="Recipe" className={classes.avatar}>
                
              </Avatar>
            }
            // action={
            //   <IconButton>
            //     <MoreVertIcon />
            //   </IconButton>
            // }
            title={this.props.bev.name}
            subheader={<Moment date={this.props.bev.dateUpdated} format="MMMM Do YYYY, h:mm a" />}
          />
          {/* <CardMedia
            className={classes.media}
            image=""
            title=""
          /> */}
          <CardContent>
            <Typography component="p">
              {this.props.bev.description}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            {!this.state.inputOpen? <IconButton 
              onClick={this.handleOpenNote} 
              aria-label="Add A Note">
                <AddNoteIcon /> 
              </IconButton> : 
            <IconButton 
            onClick={this.handleOpenNote} 
            aria-label="Add A Note">
              <CancelIcon /> 
            </IconButton>}
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          {/* <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6" gutterBottom>Comments</Typography>
              {allBevs[0].notes.map(note=>(
                <Typography>{note}</Typography>
              ))}
            </CardContent>
          </Collapse> */}
          {this.state.inputOpen? renderCommentInput : null}
        </Card>
      </div>
    )
  }
}

TastingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TastingCard);
