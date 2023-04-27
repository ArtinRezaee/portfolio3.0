import React, { ReactNode } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import classNames from 'classnames';
import { makeStyles } from '@/config/makeStyles';
import { useGtag } from '@/hooks';

const useStyles = makeStyles()((theme) => ({
  cardHeader: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundImage:
      'linear-gradient(to right, #4776E6 0%, #8E54E9  51%, #4776E6  100%)',
    transition: '0.5s',
    backgroundSize: '200% auto',
    borderRadius: '10px',
    color: theme.palette.common.white,
    '&:hover': {
      backgroundImage:
        'linear-gradient(to right, #4776E6 0%, #8E54E9  51%, #4776E6  100%)',
      transition: '0.5s',
      backgroundSize: '200% auto',
      borderRadius: '10px',
      backgroundPosition: 'right center',
      textDecoration: 'none',
    },
  },
  cardActions: {
    justifyContent: 'center',
  },
}));

type ContactCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  buttonText: string;
};

export const ContactCard: React.FC<ContactCardProps> = ({
  buttonText,
  description,
  href,
  icon,
  title,
}: ContactCardProps) => {
  const { classes } = useStyles();
  const { gtagEvent } = useGtag();

  const handleClick = () => {
    gtagEvent({
      action: 'click',
      category: 'contact button',
      label: title,
    });
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" component="div" className={classes.cardHeader}>
          {title}
        </Typography>
        <Typography sx={{ mb: 1.5 }}>{description}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          variant="contained"
          size="large"
          startIcon={icon}
          href={href}
          target="_blank"
          onClick={handleClick}
          className={classNames(classes.actionButton)}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};
