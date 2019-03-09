import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddNoteIcon from '@material-ui/icons/NoteAddTwoTone';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { MyContext } from "../MyContext/MyContext";
import GrowTextInput from "../GrowTextInput";
import './TastingCard.css';

const styles = theme => ({
  card: {
    maxWidth: 400,
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
    inputOpen: false
   };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleOpenNote = () => {
    this.setState(state => ({ inputOpen: !state.inputOpen }));
  }

  render() {
    const { classes } = this.props;

    return (
      <MyContext.Consumer>
          {context => {
            const { allBevs } = context.myState;
            // const postNote = value.postNote;
            console.log(this.state);

            const renderCommentInput = (
              <GrowTextInput 
                closeInput={this.handleOpenNote} 
                // postNoteHandler={postNote} 
                checked={this.state.inputOpen}>
              </GrowTextInput>
            );

            return (
              <div>
                <Card raised={true} className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                        
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={allBevs[0].name}
                    subheader="September 14, 2016"
                  />
                  {/* <CardMedia
                    className={classes.media}
                    image=""
                    title=""
                  /> */}
                  <CardContent>
                    <Typography component="p">
                      {/* {allBevs[0].size} {allBevs[0].unit}: ${allBevs[0].price} */}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton 
                      onClick={this.handleOpenNote} 
                      aria-label="Add to favorites">
                      <AddNoteIcon />
                    </IconButton>
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
                  <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{allBevs[0].description}</Typography>
                    </CardContent>
                  </Collapse>
                </Card>
                {this.state.inputOpen? renderCommentInput : null}
              </div>
            )
          }}
      </MyContext.Consumer>
    )
  }
}

TastingCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TastingCard);
