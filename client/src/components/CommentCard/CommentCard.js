import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: "70%",
    margin: "20px auto",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 18,
    fontWeight: "bolder"
  },
  pos: {
    marginBottom: 12,
    position: "absolute",
    top: "15px",
    right: "30px",
    fontSize: 18,
    fontWeight: "bolder"
  },
  content: {
    position: "relative",
  }
};

function CommentCard(props) {

  const { classes } = props;

  return (
    <Card raised={true} className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.leftBy}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.comment}
        </Typography>
        <Typography component="p">
         
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

CommentCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentCard);