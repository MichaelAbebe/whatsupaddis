import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import Dialog from "@material-ui/core/Dialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/grid";
import Typograpy from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// import DialogTitle from "@material-ui/core/DialogTitle";
import { getList, clearErrors } from "../../redux/actions/dataActions";
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
// import { Avatar } from "@material-ui/core";
const styles = (theme) => ({
  ...theme.spreadThis,

  profileImage: { maxWidth: 200, hight: 100, objectFit: "cover" },
  dialogContent: { padding: 20 },
  closeButton: { position: "absolute", left: "90%" },
  expandButton: {
    left: "8%",
  },
  spinnerDiv: {
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
});

class ListDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: "",
  };
  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, listId } = this.props;
    const newPath = `/users/${userHandle}/list/${listId}`;
    window.history.pushState(null, null, newPath);
    if (oldPath === newPath) oldPath = `/users/${userHandle}`;

    this.setState({ open: true, oldPath, newPath });
    this.props.getList(this.props.listId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      classes,
      list: {
        listId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
    } = this.props;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={11}>
        <Grid item sm={5}>
          <img src={userImage} alt="profile" className={classes.profileImage} />
        </Grid>
        <Grid item sm={7}>
          <Typograpy
            component={Link}
            color="primary"
            variant="h5"
            to={`/users/${userHandle}`}
          >
            Posted by: {userHandle}
          </Typograpy>
          <hr className={classes.invisibleSeparator}></hr>
          <Typograpy variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a,MMMM DD YYYY")}
          </Typograpy>
          <hr className={classes.invisibleSeparator}></hr>
          <Typograpy variant="body1">{body}</Typograpy>
          <LikeButton listId={listId} />
          <span>{likeCount} likes </span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} Comments</span>
        </Grid>
        <hr className={classes.visibleSeparator} />
        <CommentForm listId={listId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Details"
          tipClassName={classes.expandButton}
        >
          <UnfoldMore color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}
ListDialog.prototypes = {
  clearErrors: PropTypes.func.isRequired,
  getList: PropTypes.func.isRequired,
  listId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  list: state.data.list,
  UI: state.UI,
});

const mapActionToProps = {
  getList,
  clearErrors,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(ListDialog));
