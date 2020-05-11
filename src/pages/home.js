import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import axios from "axios";
import List from "../components/List";
import Profile from "../components/Profile";
class home extends Component {
  state = { lists: null };

  componentDidMount() {
    axios
      .get("/lists")

      .then((res) => {
        this.setState({
          lists: res.data,
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    let recenListMarkup = this.state.lists ? (
      this.state.lists.map((list) => <List key={list.listId} list={list} />)
    ) : (
      <p>Loadingplease wait</p>
    );
    return (
      <Grid container spacing={1}>
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

export default home;
