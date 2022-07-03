import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import useStyles from './styles.js';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '../Input/Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';

const Auth = () => {
  console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
  const classes = useStyles();
  const [isSignup, setIsSignup] = useState(true);
  const handleSubmit = () => {};
  const handleChange = () => {};

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const googleError = () =>
    alert('Google Sign In was unsuccessful. Try again later');

  const googleSuccess = async res => {
    // const result = res?.profileObj;
    // const token = res?.tokenId;
    // try {
    //   dispatch({ type: AUTH, data: { result, token } });
    //   history.push('/');
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <Container
      component='main'
      maxWidth='xs'
    >
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form
          className={classes.form}
          onSubmit={handleSubmit}
        >
          <Grid
            container
            spacing={2}
          >
            {isSignup && (
              <Fragment>
                <Input
                  name='firstName'
                  label='firstName'
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name='lastName'
                  label='lastName'
                  half
                  handleChange={handleChange}
                />
              </Fragment>
            )}
            <Input
              name='email'
              label='Email Address'
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                handleChange={handleChange}
                type='password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            {isSignup ? 'Sign Up' : 'Sign In'}
          </Button>
          <Grid
            container
            justifyContent='flex-end'
          >
            <Grid item>
              <Typography variant='body2'>
                {isSignup
                  ? 'Already have an account?'
                  : "Don't have an account?"}
              </Typography>
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                render={renderProps => (
                  <Button
                    className={classes.googleButton}
                    color='primary'
                    fullWidth
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant='contained'
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleError}
                cookiePolicy='single_host_origin'
              />
              <Button
                onClick={changeMode}
                variant='contained'
                color='primary'
              >
                {isSignup ? 'Sign In' : 'Sign Up'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
