import {
  SET_LISTS,
  LOADING_DATA,
  LIKE_LIST,
  UNLIKE_LIST,
  DELETE_LIST,
  POST_LIST,
  LOADING_UI,
  SET_ERRORS,
  CLEAR_ERRORS,
} from "../types";
import axios from "axios";

//Get all lists
export const getLists = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/lists")
    .then((res) => {
      dispatch({
        type: SET_LISTS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_LISTS,
        payload: [],
      });
    });
};

//Post List
export const postList = (newList) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/list", newList)
    .then((res) => {
      dispatch({ type: POST_LIST, payload: res.data });
      dispatch({ type: CLEAR_ERRORS });
    })
    .catch((err) => {
      dispatch({ type: SET_ERRORS, payload: err.response.data });
    });
};

//Like Lists
export const likeList = (listId) => (dispatch) => {
  axios
    .get(`/list/${listId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//Unlike Lists
export const unlikeList = (listId) => (dispatch) => {
  axios
    .get(`/list/${listId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_LIST,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//Delete list
export const deleteList = (listId) => (dispatch) => {
  axios
    .delete(`/list/${listId}`)
    .then(() => {
      dispatch({ type: DELETE_LIST, payload: listId });
    })
    .catch((err) => console.log(err));
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
