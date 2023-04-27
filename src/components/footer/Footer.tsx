import React from 'react';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CSSObject } from 'tss-react';
import { Typography } from '@mui/material';
import { makeStyles } from '@/config/makeStyles';
import { NavbarItemsType } from '@/types';
import { ContactLinks } from '@/client/generated/schemas';
import { LogoComponent } from '../common';
import FooterNavItems from './FooterNav';
import FooterContacts from './FooterContacts';

const useStyles = makeStyles()((theme) => ({
  container: {
    borderTop: `1px solid ${theme.palette.grey[800]}`,
    padding: theme.spacing(6.25, 0),
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundPosition: '50% 50%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  linksContainer: {
    display: 'flex',
    width: '50%',
    alignItems: 'flex-start',
    [theme.breakpoints.down('md')]: {
      width: '100%',
    },
  },
  imageContainer: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  },
  imageInnerContainer: {
    width: '100%',
    textAlign: 'center',
  },
  copyRightIcon: {
    ...(theme.typography.caption as CSSObject),
    margin: theme.spacing(0, 0.5, 0, 0.5),
  },
  developedBy: {
    marginTop: theme.spacing(2),
  },
  image: {
    cursor: 'pointer',
  },
}));

type FooterProps = {
  items: NavbarItemsType;
  contactLinks: ContactLinks[];
};

export const Footer: React.FC<FooterProps> = ({
  items,
  contactLinks,
}: FooterProps) => {
  const { classes } = useStyles();
  const year = new Date().getFullYear();

  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <div className={classes.imageInnerContainer}>
          <LogoComponent width="100" height="100" />
          <div>
            <Typography variant="caption">Copyright</Typography>
            <CopyrightIcon fontSize="small" className={classes.copyRightIcon} />
            <Typography variant="caption">
              {year} Artin Rezaee All Rights Reserved
            </Typography>
          </div>
          <div className={classes.developedBy}>
            <Typography variant="caption">Developed with</Typography>
            <FavoriteIcon fontSize="small" className={classes.copyRightIcon} />
            <Typography variant="caption">by Artin Rezaee</Typography>
          </div>
        </div>
      </div>
      <div className={classes.linksContainer}>
        <FooterNavItems items={items} />
        <FooterContacts contactLinks={contactLinks} />
      </div>
    </div>
  );
};

export default Footer;
