import React from 'react';
import { CSSObject } from 'tss-react';
import { List, ListItem, ListSubheader } from '@mui/material';
import { Link } from 'react-scroll';
import { NavbarItemsType } from '@/types';
import { makeStyles } from '@/config/makeStyles';

const useStyles = makeStyles()((theme) => ({
  list: {
    width: '50%',
  },
  subHeader: {
    ...(theme.typography.subtitle1 as CSSObject),
    fontWeight: theme.typography.fontWeightBold,
    marginBottom: theme.spacing(1),
  },
  itemText: {
    cursor: 'pointer',
    ...(theme.typography.body2 as CSSObject),
  },
}));

type FooterNavItemsProps = {
  items: NavbarItemsType;
};

const FooterNavItems: React.FC<FooterNavItemsProps> = ({
  items,
}: FooterNavItemsProps) => {
  const { classes } = useStyles();
  return (
    <List className={classes.list}>
      <ListSubheader className={classes.subHeader}>Website</ListSubheader>
      {items.map((navItem) => (
        <ListItem key={navItem.titlle}>
          <Link
            to={navItem.titlle ?? ''}
            smooth
            spy
            duration={1000}
            className={classes.itemText}
          >
            {navItem.titlle?.toLocaleUpperCase()}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default FooterNavItems;
