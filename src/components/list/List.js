import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//Day formating
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import card properties
import Card from "@material-ui/core/Card";
import ListDialog from "./ListDialog";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import MuiLink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import PropTypes from "prop-types";
import ChatIcon from "@material-ui/icons/Chat";

// import PostDetails from "./PostDetails";
import MyButton from "../../util/MyButton";
import DeleteList from "./DeleteList";
import LikeButton from "./LikeButton";
import LoadingComponent from "../../util/LoadingComponent";

const styles = {
  card: {
    position: "relative",
    display: "flex",
    marginBottom: 20,
  },
  image: {
    minWidth: 200,
    height: 100,
  },
  content: {
    padding: 25,
    objectFit: "cover",
  },
  comments: {
    // position: "absolute",
    marginLeft: -20,
    marginBottom: -50,
    textAlign: "center",
  },
};

class List extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      list: {
        body,
        createdAt,
        userImage,
        userHandle,
        listId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteList listId={listId} />
      ) : null;

    return (
      <Card className={classes.card}>
        <MuiLink
          component={Link}
          to={`/list/${listId}`}
          color="primary"
          variant="h5"
        >
          <CardMedia
            className={classes.image}
            image={userImage}
            title="Profile Image"
          />
        </MuiLink>
        <CardContent className={classes.content}>
          <Typography
            variant="caption"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>
          {deleteButton}
          <Typography variant="body1">{body}</Typography>
          <Typography variant="caption" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <br />

          <CardContent className={classes.comments}>
            <LikeButton listId={listId} />
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} Comments</span>
            <ListDialog
              listId={listId}
              userHandle={userHandle}
              openDialog={this.props.openDialog}
            />
          </CardContent>
        </CardContent>
      </Card>
    );
  }
}

List.propTypes = {
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(List));
