import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  footer: {
    backgroundColor: 'lightgray',
    minHeight: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      paddingTop: theme.spacing(1),
    },
  },
  copyright: {
    alignItems: 'center',
    color: '#000',
    [theme.breakpoints.up('xs')]: {
      justifyContent: 'flex-start',
    },
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'center',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid
        container
        className={clsx(classes.root, classes.footer)}
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <Grid container className={classes.copyright}>
            <Typography variant="body2">© David Omrai</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6} />
      </Grid>
    </div>
  );
};

Footer.displayName = 'Footer';

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
