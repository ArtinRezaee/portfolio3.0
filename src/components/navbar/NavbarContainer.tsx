import React, { useEffect, useState } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useMediaQuery, useTheme } from '@mui/material';
import classNames from 'classnames';

import { NavbarItemsType } from '@/types';
import { LogoComponent } from '../common';
import { NavbarItems } from './NavbarItems';
import NavbarItemsMobile from './NavbarItemsMobile';

type NavbarContainerProps = {
  navbarItems: NavbarItemsType;
};

const useStyles = makeStyles()((theme) => ({
  container: {
    width: '100%',
  },
  navbar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    display: 'flex',
    justifyContent: 'flex-end',
    top: 0,
    position: 'fixed',
    color: theme.palette.common.white,
    width: '100%',
    zIndex: 999,
    height: theme.spacing(8),
    alignItems: 'center',
  },
  navSticky: {
    transition: 'all 0.3s ease-out',
    background: theme.palette.common.black,
  },
}));

const useImageStyles = makeStyles<{ isMobile: boolean }>()(
  (theme, { isMobile }) => ({
    image: {
      margin: !isMobile ? theme.spacing(6) : theme.spacing(3),
    },
  })
);

export const NavbarContainer: React.FC<NavbarContainerProps> = ({
  navbarItems,
}: NavbarContainerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { classes } = useStyles();
  const { classes: imageClasses } = useImageStyles({ isMobile });
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    window.onscroll = () => {
      window.scrollY <= 30 ? setIsAtTop(true) : setIsAtTop(false);
    };
  });

  // window.onscroll = () => {
  //   window.scrollY <= 30 ? setIsAtTop(true) : setIsAtTop(false);
  // };

  return (
    <div className={classes.container}>
      <div
        className={classNames(classes.nav, {
          [classes.navSticky]: !isAtTop,
        })}
      >
        <div className={classes.navbar}>
          <LogoComponent width="50" height="50" classes={imageClasses} />
        </div>
        {!isMobile ? (
          <NavbarItems items={navbarItems} />
        ) : (
          <NavbarItemsMobile items={navbarItems} />
        )}
      </div>
    </div>
  );
};

export default NavbarContainer;
