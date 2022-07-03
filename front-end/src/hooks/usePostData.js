import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/**
 * It returns an array with the postData state and a function to set the postData state
 * @returns An array with two elements. The first element is the postData state and the second element
 * is the setPostData function.
 */
export const usePostData = currentId => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const post = useSelector(state =>
    currentId ? state.posts.find(message => message._id === currentId) : null
  );
  useEffect(() => {
    if (post) setPostData(post);
  }, [post, currentId]);
  return [postData, setPostData];
};
