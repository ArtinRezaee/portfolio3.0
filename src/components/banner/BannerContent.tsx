import React from 'react';
import { CSSObject } from 'tss-react';
import { Typography } from '@mui/material';
import { makeStyles } from '@/config/makeStyles';

const useStyles = makeStyles()((theme) => ({
  introTextContainer: {
    marginBottom: theme.spacing(6),
  },
  introText: {
    color: theme.palette.common.white,
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('md')]: {
      ...(theme.typography.h4 as CSSObject),
    },
    fontFamily: 'Open Sans,sans-serif',
  },
  introSub: {
    color: theme.palette.common.white,
    ...(theme.typography.h5 as CSSObject),
    [theme.breakpoints.down('md')]: {
      ...(theme.typography.h6 as CSSObject),
    },
    fontWeight: theme.typography.fontWeightLight,
    textTransform: 'uppercase',
  },
}));

export const BannerContent: React.FC = () => {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.introTextContainer}>
        <Typography variant="h1" className={classes.introText}>
          Artin Rezaee
        </Typography>
        <Typography variant="h2" className={classes.introSub}>
          Software Engineer
        </Typography>
      </div>
    </>
  );
};
