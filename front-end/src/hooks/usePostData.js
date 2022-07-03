import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCurrentId } from '../actions/currentIdActions';
import { createPost, updatePost } from '../actions/postsActions';

/**
 * It returns an array with the postData state and a function to set the postData state
 * @returns An array with two elements. The first element is the postData state and the second element
 * is the setPostData function.
 */
export const usePostData = () => {
  const currentId = useSelector(state => state.currentId);
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const post = useSelector(state =>
    state.currentId
      ? state.posts.find(message => message._id === state.currentId)
      : null
  );
  useEffect(() => {
    if (post) setPostData(post);
  }, [post, currentId]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (currentId === 0) {
      dispatch(createPost(postData));
      clear();
      dispatch(clearCurrentId());
      return;
    }
    dispatch(updatePost(postData));
    clear();
    dispatch(clearCurrentId());
  };

  const handleChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  const clear = e => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
    dispatch(clearCurrentId());
  };

  return [postData, setPostData, currentId, handleSubmit, handleChange, clear];
};
