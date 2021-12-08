/* eslint-disable react/no-danger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-curly-brace-presence */
import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';
import RetweetIcon from '@material-ui/icons/Sync';

const styles = (theme) => ({
  root: {
    width: '100%',
    padding: theme.spacing(1),
  },
  likeIcon: {
    fontSize: 'medium',
    color: 'red',
  },
  retweetIcon: {
    fontSize: 'medium',
    color: 'green',
  },
  tweetSource: {
    '& a': {
      color: 'black',
      textDecoration: 'none',
    },
    display: 'table-row',
  },
});

const Tweet = (props) => {
  const {
    data,
    classes,
  } = props;

  const readTweetDate = (twtDate) => {
    const tdate = new Date(twtDate);

    const [
      day,
      month,
      year,
      hour,
      minutes,
    ] = [
      tdate.getDate(),
      tdate.toLocaleString('default', { month: 'short' }),
      tdate.getFullYear(),
      tdate.getHours(),
      tdate.getMinutes(),
    ];
    const [
      padDay,
      padHour,
      padMinutes,
      ampm,
    ] = [
      day.toString().padStart(2, '0'),
      hour > 12 ? (hour - 12).toString().padStart(2, '0')
        : hour.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      hour > 12 ? 'PM' : 'AM',
    ];
    return `${padHour}:${padMinutes} ${ampm} · ${month} ${padDay}, ${year}`;
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      spacing={1}
      className={classes.root}
    >
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={4}>
            <a href={`https://twitter.com/adent/status/${data.id}`}>
              <img
                alt="profile-pic"
                src={data.user_profile_image_url_https}
              />
            </a>
          </Grid>
          <Grid item xs={8}>
            <Grid container>
              <Grid item xs={6}>
                {data.user_screen_name}
              </Grid>
              <Grid item xs={6}>
                {data.user_name}
              </Grid>
              <Grid item xs={6}>
                {data.user_location}
              </Grid>
              <Grid item xs={6}>
                {data.lang}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        {data.full_text}
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <span>{`${readTweetDate(data.created_at)} · `}</span>
          <span
            dangerouslySetInnerHTML={{ __html: data.source }}
            className={classes.dataSource}
          />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <span>{data.favorite_count}</span>
          <FavoriteIcon className={classes.likeIcon} />
          <span>{data.retweet_count}</span>
          <RetweetIcon className={classes.retweetIcon} />
        </Grid>
      </Grid>
    </Grid>
  );
};

Tweet.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  classes: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withStyles(styles)(Tweet);
