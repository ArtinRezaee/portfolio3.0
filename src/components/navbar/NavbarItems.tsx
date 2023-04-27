import React from 'react';
import { CSSObject } from 'tss-react';
import { Link } from 'react-scroll';
import { Navbar } from '@/client/generated/schemas';
import { makeStyles } from '@/config/makeStyles';
import { NavbarItemsType } from '@/types';

const useStyles = makeStyles()((theme) => ({
  navbar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  link: {
    cursor: 'pointer',
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    ...(theme.typography.body1 as CSSObject),
    textDecoration: 'none',
    background:
      'linear-gradient(currentColor, currentColor) bottom / 0 .1em no-repeat',
    transition: '0.3s background-size',
    '&:hover': {
      backgroundSize: '100% .1em',
    },
  },
  active: {
    backgroundSize: '100% .1em',
  },
}));

type NavbarProps = {
  items: NavbarItemsType;
};

export const NavbarItems: React.FC<NavbarProps> = ({ items }: NavbarProps) => {
  const { classes } = useStyles();
  return (
    <>
      {items.map((navItem) => (
        <Link
          key={navItem.titlle}
          to={navItem.titlle ?? ''}
          smooth
          spy
          duration={1000}
          className={classes.link}
          activeClass={classes.active}
        >
          {navItem.titlle?.toLocaleUpperCase()}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
