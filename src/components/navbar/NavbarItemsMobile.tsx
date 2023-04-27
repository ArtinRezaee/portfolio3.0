import React, { useReducer } from 'react';
import { CSSObject } from 'tss-react';
import { Link } from 'react-scroll';
import { Drawer, IconButton, List, ListItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@/config/makeStyles';
import { NavbarItemsType } from '@/types';

const useStyles = makeStyles()((theme) => ({
  navbar: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  button: {
    color: theme.palette.common.white,
  },
  list: {
    width: 250,
  },
  listContainer: {
    padding: 0,
    height: theme.spacing(5),
  },
  listItem: {
    ...(theme.typography.body1 as CSSObject),
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  active: {
    background: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}));

type NavbarItemsMobileProps = {
  items: NavbarItemsType;
};

export const NavbarItemsMobile: React.FC<NavbarItemsMobileProps> = ({
  items,
}: NavbarItemsMobileProps) => {
  const { classes } = useStyles();
  const [openMenu, toggleIsOpen] = useReducer((state) => !state, false);

  return (
    <>
      <IconButton className={classes.button} onClick={toggleIsOpen}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={openMenu}
        onClose={toggleIsOpen}
        variant="temporary"
      >
        <List className={classes.list}>
          {items.map((navItem) => (
            <ListItem
              button
              className={classes.listContainer}
              key={navItem.titlle}
            >
              <Link
                to={navItem.titlle ?? ''}
                smooth
                spy
                duration={1000}
                className={classes.listItem}
                activeClass={classes.active}
              >
                {navItem.titlle?.toLocaleUpperCase()}
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavbarItemsMobile;
