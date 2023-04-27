import React from 'react';
import { CSSObject } from 'tss-react';
import {
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
} from '@mui/material';
import { ContactLinks } from '@/client/generated/schemas';
import { makeStyles } from '@/config/makeStyles';
import { getLinkIcon } from '@/utils/GetLinkIcon';

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
    ...(theme.typography.body2 as CSSObject),
    color: theme.palette.common.white,
  },
  icon: {
    minWidth: '0',
    marginRight: theme.spacing(2),
  },
}));

type FooterContactsProps = {
  contactLinks: ContactLinks[];
};

export const FooterContacts: React.FC<FooterContactsProps> = ({
  contactLinks,
}: FooterContactsProps) => {
  const { classes } = useStyles();

  return (
    <List className={classes.list}>
      <ListSubheader className={classes.subHeader}>Contact</ListSubheader>
      {contactLinks.map((contactLink) => (
        <ListItem key={contactLink.link}>
          <ListItemIcon className={classes.icon}>
            {getLinkIcon(contactLink.type ?? '', 'small')}
          </ListItemIcon>
          <Link
            variant="body2"
            className={classes.itemText}
            underline="none"
            href={contactLink.link ?? ''}
            target="_blank"
          >
            {contactLink.type}
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default FooterContacts;
