/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

const styles = (theme) => ({
  root: {
    border: '1px solid #c0c0c4',
    width: '100%',
    display: 'flex',
  },
});

const Tweet = (props) => {
  const {
    data,
    classes,
  } = props;
  return (
    <div className={classes.root}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={4}>
              logo
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={6}>
                  one
                </Grid>
                <Grid item xs={6}>
                  two
                </Grid>
                <Grid item xs={6}>
                  three
                </Grid>
                <Grid item xs={6}>
                  four
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          text
        </Grid>

        <Grid item xs={12}>
          time and date of posting
        </Grid>

        <Grid item xs={12}>
          likes and retweets
        </Grid>
      </Grid>
    </div>
  );
};

Tweet.propTypes = {
  data: PropTypes.string.isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(Tweet);
