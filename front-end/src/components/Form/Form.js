import React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles.js';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/postsActions.js';
import { usePostData } from '../../hooks/usePostData.js';
import { clearCurrentId } from '../../actions/currentIdActions';

const Form = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const currentId = useSelector(state => state.currentId);
  const [postData, setPostData] = usePostData(currentId);
  /**
   * It will either create a new post or update an existing post depending on the value of the currentId
   * variable
   */
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
  /**
   * If the input is a tag, split the input into an array of tags. Otherwise, set the value of the input
   * to the value of the input
   */
  const handleChange = e => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };
  /**
   * The clear function is called when the user clicks the clear button. It prevents the default action
   * of the button, and then sets the postData state back to its default values
   */
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
  return (
    <Paper className={classes.paper}>
      <form
        noValidate
        autoComplete='off'
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant='h6'>
          {currentId === 0 ? 'Creating' : 'updating'}
        </Typography>
        <TextField
          name='creator'
          variant='outlined'
          label='Creator'
          fullWidth
          value={postData.creator}
          onChange={handleChange}
        ></TextField>
        <TextField
          name='title'
          variant='outlined'
          label='Title'
          fullWidth
          value={postData.title}
          onChange={handleChange}
        ></TextField>
        <TextField
          name='message'
          variant='outlined'
          label='Message'
          multiline
          minRows={4}
          fullWidth
          value={postData.message}
          onChange={handleChange}
        ></TextField>
        <TextField
          name='tags'
          variant='outlined'
          label='Tags (coma separated)'
          fullWidth
          value={postData.tags}
          onChange={e =>
            setPostData({
              ...postData,
              tags: e.target.value.split(','),
            })
          }
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase
            type='file'
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          type='submit'
          variant='contained'
          color='primary'
          size='large'
          className={classes.buttonSubmit}
          fullWidth
        >
          {currentId === 0 ? 'Create' : 'Update'}
        </Button>
        <Button
          variant='contained'
          color='secondary'
          size='small'
          fullWidth
          onClick={clear}
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
