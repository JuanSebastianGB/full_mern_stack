import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import useStyles from './styles';
import headerImage from '../../images/header_image.png';
import { Link } from 'react-router-dom';
const Navbar = () => {
  const classes = useStyles();
  const user = {};

  return (
    <AppBar
      className={classes.appBar}
      position='static'
      color='inherit'
    >
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to='/'
          className={classes.heading}
          variant='h2'
          align='center'
        >
          React Material Full Stack
        </Typography>
        <img
          className={classes.image}
          src={headerImage}
          alt='header'
          height='60'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user?.result.name}
              src={user?.result.imageUrl}
            >
              {user?.result.name.charAt(0)}
            </Avatar>
            <Typography
              className={classes.userName}
              variant='h6'
            >
              {user?.result.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              // onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
