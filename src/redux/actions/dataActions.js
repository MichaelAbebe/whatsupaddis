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
  STOP_LOADING_UI,
  SET_LIST,
  SUBMIT_COMMENT,
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
//Get list detils
export const getList = (listId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/list/${listId}`)
    .then((res) => {
      dispatch({
        type: SET_LIST,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
//Post List
export const postList = (newList) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/list", newList)
    .then((res) => {
      dispatch({ type: POST_LIST, payload: res.data });
      dispatch(clearErrors());
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

//Submit a comment

export const submitComment = (listId, commentData) => (dispatch) => {
  axios
    .post(`/list/${listId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_LISTS,
        payload: res.data.lists,
      });
    })
    .catch(() => {
      dispatch({ type: SET_LISTS, payload: null });
    });
};
