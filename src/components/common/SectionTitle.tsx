import React from 'react';
import { Typography } from '@mui/material';
import { makeStyles } from '@/config/makeStyles';

type SectionTitleProps = {
  title: string;
};

const useStyles = makeStyles()((theme) => ({
  title: {
    marginBottom: theme.spacing(6.25),
    fontSize: '2.2em',
  },
}));

export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
}: SectionTitleProps) => {
  const { classes } = useStyles();

  return (
    <Typography variant="h2" align="center" className={classes.title}>
      {title.toLocaleUpperCase()}
    </Typography>
  );
};
