import React, { useEffect } from 'react';
import { Container, Grid, Grow } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../actions/postsActions';

const Home = () => {
  const currentId = useSelector(state => state.currentId);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          spacing={3}
          justifyContent='space-between'
          alignItems='stretch'
        >
          <Grid
            item
            xs={12}
            sm={7}
          >
            <Posts />
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
          >
            <Form />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
