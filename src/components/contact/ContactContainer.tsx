import React from 'react';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import { makeStyles } from '@/config/makeStyles';
import { ContactLinks } from '@/client/generated/schemas';
import { getLinkIcon } from '@/utils/GetLinkIcon';
import { Section } from '../common';
import { ContactCard } from './ContactCard';

const useStyles = makeStyles()((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },
  imageContainer: {
    display: 'flex',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 450,
  },
  itemText: {
    color: theme.palette.common.white,
  },
  cardHeader: {
    marginBottom: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  actionButton: {
    backgroundImage:
      'linear-gradient(to right, #4776E6 0%, #8E54E9  51%, #4776E6  100%)',
    transition: '0.5s',
    backgroundSize: '200% auto',
    borderRadius: '10px',
  },
  'learnMoreButton:hover': {
    backgroundImage:
      'linear-gradient(to right, #4776E6 0%, #8E54E9  51%, #4776E6  100%)',
    transition: '0.5s',
    backgroundSize: '200% auto',
    borderRadius: '10px',
    backgroundPosition: 'right center',
    textDecoration: 'none',
  },
  cardActions: {
    justifyContent: 'center',
  },
}));

type ContactContainerProps = {
  contactLinks: ContactLinks[];
};

export const ContactContainer: React.FC<ContactContainerProps> = ({
  contactLinks,
}: ContactContainerProps) => {
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));
  const { classes } = useStyles();

  return (
    <Section id="Contact" title="I'd love to chat">
      <div className={classes.container}>
        <Box sx={{ width: !isMedium ? '50%' : '100%' }}>
          <Grid container spacing={2}>
            {contactLinks.map((contactLink) => (
              <Grid item xs={12} key={contactLink.link}>
                <ContactCard
                  title={contactLink.title ?? ''}
                  buttonText={contactLink.buttonText ?? ''}
                  icon={getLinkIcon(contactLink.type ?? '')}
                  href={contactLink.link ?? ''}
                  description={contactLink.description ?? ''}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        {!isMedium && (
          <div className={classes.imageContainer}>
            <Image
              src="/images/email.svg"
              alt="Contact me"
              height={500}
              width={500}
              className={classes.image}
            />
          </div>
        )}
      </div>
    </Section>
  );
};

export default ContactContainer;
