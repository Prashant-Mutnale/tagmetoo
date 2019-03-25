import { FETCH_POSTS, NEW_POSTS, CREATE_POST } from "./types";
// import fetch from 'isomorphic-unfetch';

// fetch
export const new_posts = getvalues => dispatch => {
  console.log("got", getvalues);
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json())
    .then(posts =>
      dispatch({
        type: NEW_POSTS,
        payload: posts
      })
    );
};
