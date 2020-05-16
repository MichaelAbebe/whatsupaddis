import React, { Component, Fragment } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../util/MyButton";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import { connect } from "react-redux";
import { deleteList } from "../redux/actions/dataActions";

const styles = {
  deleteButton: {
    position: "absolute",
    left: "85%",
    top: "55%",
    color: "red",
  },
};
class DeleteList extends Component {
  state = {
    open: false,
  };
  handleOpen = () => {
    this.setState({
      open: true,
    });
  };
  handleClose = () => {
    this.setState({
      open: false,
    });
  };
  deleteList = () => {
    this.props.deleteList(this.props.listId);
    this.setState({
      open: false,
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton
          tip="Delete List"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteOutline color="red" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete ?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteList} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteList.prototypes = {
  deleteList: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  listId: PropTypes.object.isRequired,
};
export default connect(null, { deleteList })(withStyles(styles)(DeleteList));
