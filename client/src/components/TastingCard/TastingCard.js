import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { MyContext } from "../MyContext/MyContext";
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
    backgroundColor: red[500],
  },
});


class RecipeReviewCard extends React.Component {
  state = { expanded: false };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;

    return (
      <MyContext.Consumer>
          {value => {
            const {allBevs} = value.myState;
            const ratingMean = (allBevs[0].ratings.reduce((a,b) => a + b, 0) / allBevs[0].ratings.length).toFixed(1);
            return (
                <Card className={classes.card}>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="Recipe" className={classes.avatar}>
                        {ratingMean}
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
                  <CardMedia
                    className={classes.media}
                    image="https://groceries.morrisons.com/productImages/217/217703011_0_640x640.jpg?identifier=e7cf36512b30ca18065e5a740e6b2e81"
                    title="Paella dish"
                  />
                  <CardContent>
                    <Typography component="p">
                      {allBevs[0].size} {allBevs[0].unit}: ${allBevs[0].price}
                    </Typography>
                  </CardContent>
                  <CardActions className={classes.actions} disableActionSpacing>
                    <IconButton onClick={(e)=>value.addRating(e)} aria-label="Add to favorites">
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="Share">
                      <ShareIcon />
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
                
                // <Card className={classes.card}>
                // <CardContent className="topcolor"
                //     />
                //   <Grid  container
                //           direction="row"
                //           justify="space-between"
                //           alignItems="center">
                //   <CardHeader id="cardheader"

                //     title="Name"
                //     subheader="basic text"
                //     />
                //   {/* <CardHeader id="priceheader"
                //     title= "Price"
                //     subheader="Alt Price"
                //     /> */}
                //   </Grid>
                //   <CardContent>
                //   {/* context!!! */}
                //    {check}
                //   </CardContent>
                //   <Grid>
                //     <CardActions className={classes.actions} disableActionSpacing>

                //       <Button style={{borderStyle: 'solid', borderWidth: '2px'}}>
                //         <Typography><b>Add your comments</b></Typography>
                //       </Button>
                //       <IconButton
                //         className={classnames(classes.expand, {
                //           [classes.expandOpen]: this.state.expanded,
                //         })}
                //         onClick={this.handleExpandClick}
                //         aria-expanded={this.state.expanded}
                //         aria-label="Show more"
                //       >
                //         <ExpandMoreIcon />
                //       </IconButton>
                //     </CardActions>
                //   </Grid>
                //   <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                //     <CardContent>
                //       <Typography paragraph>Description</Typography>
                //     </CardContent>
                //   </Collapse>
                // </Card>
              )
            }}
      </MyContext.Consumer>
    )
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
