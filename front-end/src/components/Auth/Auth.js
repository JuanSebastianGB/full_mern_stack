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
import { useDispatch, useSelector } from 'react-redux';
import { authenticate } from '../../actions/authActions.js';
import { useNavigate } from 'react-router-dom';
import { useLoginForm } from '../../hooks/useLoginForm';

const Auth = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isSignup, setIsSignup] = useState(true);
  const [handleChange, handleSubmit] = useLoginForm({ isSignup });
  const formData = useSelector(state => state.auth.formData);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const changeMode = () => {
    setIsSignup(!isSignup);
    setShowPassword(false);
  };

  const googleError = err =>
    alert('Google Sign In was unsuccessful. Try again later');

  const googleSuccess = async res => {
    console.log(res);
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch(authenticate(result, token));
      navigate('/');
    } catch (error) {
      console.log(error);
    }
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
                  label='First Name'
                  value={formData.firstName}
                  handleChange={handleChange}
                  half
                  autoFocus
                />
                <Input
                  name='lastName'
                  label='Last Name'
                  value={formData.lastName}
                  half
                  handleChange={handleChange}
                />
              </Fragment>
            )}
            <Input
              name='email'
              label='Email Address'
              value={formData.email}
              handleChange={handleChange}
              type='email'
            />
            <Input
              name='password'
              label='Password'
              value={formData.password}
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Repeat Password'
                value={formData.confirmPassword}
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
