import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import List from "../components/list/List";
import Profile from "../components/profile/Profile";
import { connect } from "react-redux";
import { getLists } from "../redux/actions/dataActions";
// import ListSkeleton from "../util/ListSkeleton";
import LoadingComponent from "../util/LoadingComponent";

class home extends Component {
  componentDidMount() {
    this.props.getLists();
  }
  render() {
    const { lists, loading } = this.props.data;

    let recenListMarkup = lists.map((list) => (
      <List key={list.listId} list={list} />
    ));

    if (loading) return <LoadingComponent />;
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          {recenListMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getLists: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getLists })(home);
