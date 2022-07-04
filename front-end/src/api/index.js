import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use(req => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem('profile')).token
    }`;
  }

  return req;
});

// posts
export const fetchPosts = () => API.get('/posts');
export const createPost = post => API.post('/posts', post);
export const updatePost = post => API.put(`/posts/${post._id}`, post);
export const deletePost = id => API.delete(`/posts/${id}`);
export const likePost = id => API.put(`/posts/${id}/like`, { id });

// auth
export const signUp = user => API.post('/users/auth/signup', user);
export const signIn = user => API.post('/users/auth/signin', user);
