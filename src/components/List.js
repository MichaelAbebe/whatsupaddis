import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//Day formating
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import card properties
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = {
  card: {
    float: "left",
    // display: "inline-table",
    marginLeft: 20,
    marginBottom: 20,
    minWidth: 200,
    maxWidth: 345,
  },
  image: {
    height: 120,
    minWidth: 100,
  },
  content: {
    padding: 5,
  },
};
class List extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes = styles(),
      list: {
        body,
        createdAt,
        userImage,
        userHandle,
        // listId,
        // likeCount,
        // commentCount,
      },
    } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title='Profile Image'
        />
        <CardContent className={classes.content}>
          <Typography
            variant='caption'
            component={Link}
            to={`/users/${userHandle}`}
            color='primary'
          >
            {userHandle}
          </Typography>
          <Typography variant='body1'>{body}</Typography>
          <Typography variant='caption' color='textSecondary'>
            {dayjs(createdAt).fromNow()}
          </Typography>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(List);
