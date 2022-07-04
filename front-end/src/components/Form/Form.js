import React from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import useStyles from './styles.js';
import FileBase from 'react-file-base64';
import { usePostData } from '../../hooks/usePostData.js';

const Form = () => {
  const classes = useStyles();
  const [
    user,
    postData,
    setPostData,
    currentId,
    handleSubmit,
    handleChange,
    clear,
  ] = usePostData();

  if (!user) {
    return (
      <Paper className={classes.paper}>
        <Typography variant='h5'>Please login to create elements</Typography>
      </Paper>
    );
  }
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
