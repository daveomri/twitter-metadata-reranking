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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
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
  profilePic: {
    borderRadius: '50%',
  },
  userName: {
    fontWeight: 'bold',
  },
  screenName: {
    fontSize: '11pt',
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
        <Grid container alignItems="stretch">
          <Grid item xs={2}>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="center"
            >
              <a href={`https://twitter.com/i/web/status/${data.id_str}`}>
                <img
                  alt="profile-pic"
                  src={data.user_profile_image_url_https}
                  className={classes.profilePic}
                />
              </a>
            </Grid>
          </Grid>
          <Grid item xs={10}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <span className={classes.userName}>{`${data.user_name} `}</span>
                <span className={classes.screenName}>{`@${data.user_screen_name}`}</span>
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
                <Grid
                  container
                  spacing={1}
                  alignItems="lex-end"
                >
                  <Grid item>
                    <span>{data.favorite_count}</span>
                  </Grid>
                  <Grid item>
                    <FavoriteIcon className={classes.likeIcon} />
                  </Grid>
                  <Grid item>
                    <span>{data.retweet_count}</span>
                  </Grid>
                  <Grid item>
                    <RetweetIcon className={classes.retweetIcon} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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
