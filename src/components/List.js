import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
//Day formating
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// import card properties
import Card from "@material-ui/core/Card";

import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import MuiLink from "@material-ui/core/Link";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { likeList, unlikeList } from "../redux/actions/dataActions";
import PropTypes from "prop-types";
import ChatIcon from "@material-ui/icons/Chat";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";

import MyButton from "../util/MyButton";
import DeleteList from "./DeleteList";

const styles = {
  card: {
    position: "relative",
    float: "left",
    marginLeft: 20,
    marginBottom: 20,
    minWidth: 330,
    maxWidth: 345,
  },
  image: {
    height: 180,
    minWidth: 250,
  },
  content: {
    padding: 5,
  },
  comments: {
    // position: "absolute",
    marginLeft: -20,
    marginBottom: -50,
    textAlign: "center",
  },
};
class List extends Component {
  likedList = () => {
    if (
      this.props.user.likes &&
      this.props.user.likes.find(
        (like) => like.listId === this.props.list.listId
      )
    )
      return true;
    else return false;
  };
  likeList = () => {
    this.props.likeList(this.props.list.listId);
  };
  unlikeList = () => {
    this.props.unlikeList(this.props.list.listId);
  };

  render() {
    dayjs.extend(relativeTime);
    const {
      classes = styles(),
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
    const likeButton = !authenticated ? (
      <MyButton tip="Like">
        <Link to="/login">
          <FavoriteBorder color="primary" />
        </Link>
      </MyButton>
    ) : this.likedList() ? (
      <MyButton tip="Undo Like" onClick={this.unlikeList}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={this.likeList}>
        <FavoriteBorder color="primary" />
      </MyButton>
    );
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
        /> </MuiLink>
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
            {likeButton}
            <span>{likeCount} Likes</span>
            <MyButton tip="comments">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} Comments</span>
          </CardContent>
        </CardContent>
      </Card>
    );
  }
}

List.propTypes = {
  likeList: PropTypes.func.isRequired,
  unlikeList: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});
const mapActionsToProps = {
  likeList,
  unlikeList,
};
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(List));
