import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
// import red from '@material-ui/core/colors/red';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MyContext } from "../MyContext/MyContext";
import './TastingCard.css';

const styles = theme => ({
  card: {
    maxWidth: 450,
    minWidth: 300,
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
  }
 
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
          const { check } = value;
          return(
        <Card className={classes.card}>
        <CardContent className="topcolor"
            />
          <Grid  container
                  direction="row"
                  justify="space-between"
                  alignItems="center">
          <CardHeader id="cardheader"

            title="Name"
            subheader="basic text"
            />
          <CardHeader id="priceheader"
            title= "Price"
            subheader="Alt Price"
            />
          </Grid>
          <CardContent>
          {/* context!!! */}
           {check}
          </CardContent>
          <Grid>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton className="button">
                <i className="material-icons">add_circle</i>
              </IconButton>
              <IconButton aria-label="Share">
                <i className="material-icons">add_circle</i>
              </IconButton>
              <IconButton aria-label="Share">
                <i className="material-icons">add_circle</i>
              </IconButton>
              <IconButton aria-label="Share">
                <i className="material-icons">add_circle</i>
              </IconButton>
              <IconButton aria-label="Share">
                <i className="material-icons">add_circle</i>
              </IconButton>
              <IconButton aria-label="Share">
                <i className="material-icons">add_circle</i>
              </IconButton>
              <Button>
                <Typography>I am a button</Typography>
              </Button>
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
          </Grid>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>Description</Typography>
            </CardContent>
          </Collapse>
        </Card>
          )}}
      </MyContext.Consumer>
    );
  }
}

RecipeReviewCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeReviewCard);
