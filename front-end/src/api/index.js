import axios from 'axios';

const URL = 'http://localhost:5000/posts';

/**
 * It returns a promise that will resolve to the response of a GET request to the url
 */
export const fetchPosts = () => axios.get(URL);
/**
 * It takes a post object as an argument, and then uses axios to make a POST request to the url
 * variable, which is the URL of the API endpoint
 */
export const createPost = post => axios.post(URL, post);

/**
 * It takes a post object as an argument, and then uses axios to make a PUT request to the URL of the
 * post, with the post object as the second argument
 */
export const updatePost = post => axios.put(`${URL}/${post._id}`, post);

/**
 * It takes an id as an argument, and then uses axios to make a DELETE request to the URL with the id
 * appended to the end
 */
export const deletePost = id => axios.delete(`${URL}/${id}`);

/**
 * It makes a PUT request to the URL of the post with the given id, and appends /like to the end of the
 * URL
 */
export const likePost = id => axios.put(`${URL}/${id}/like`, { id });
