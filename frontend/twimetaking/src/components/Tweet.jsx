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

  const tweet = {
    id: '1468340055223767043',
    text: 'my mind often hides in Goyas house',
    created_at: '11:02 PM · Dec 7, 2021',
    retweet_count: 0,
    favorite_count: 1,
    lang: 'CZ',
    source: '<a href="https://mobile.twitter.com" rel="nofollow">Twitter Web App</a>',
    user_name: 'DaveOmri',
    user_screen_name: '𝛿𓁿𝜈ల',
    user_location: 'Czech Republic',
    user_url: 'https://t.co/cqtuLxiy1j',
    user_verified: false,
    user_followers_count: '908',
    user_friends_count: '48',
    user_profile_image_url_https: 'https://pbs.twimg.com/profile_images/1467930674422333453/PXz__NSt_normal.jpg',
  };

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
              <img alt="profile-pic" src={tweet.user_profile_image_url_https} />
            </Grid>
            <Grid item xs={8}>
              <Grid container>
                <Grid item xs={6}>
                  {tweet.user_screen_name}
                </Grid>
                <Grid item xs={6}>
                  {tweet.user_name}
                </Grid>
                <Grid item xs={6}>
                  {tweet.user_location}
                </Grid>
                <Grid item xs={6}>
                  {tweet.lang}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {tweet.text}
        </Grid>

        <Grid item xs={12}>
          {`${tweet.created_at}·${tweet.source}`}
        </Grid>

        <Grid item xs={12}>
          {tweet.favorite_count}
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
