import React from 'react';
import { Grid, Typography } from '@mui/material';
import Image from 'next/image';
import { makeStyles } from '@/config/makeStyles';
import { About } from '@/client/generated/schemas';
import { Section } from '../common';

const useStyles = makeStyles()((theme) => ({
  img: {
    maxWidth: '100%',
    minHeight: '100%',
    height: 'auto',
  },
  about: {
    color: '#ccc',
    textAlign: 'justify',
    fontSize: '20px',
  },
  aboutContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type AboutContainerProps = {
  aboutInfo: About;
};

export const AboutContainer: React.FC<AboutContainerProps> = ({
  aboutInfo,
}: AboutContainerProps) => {
  const { classes } = useStyles();
  return (
    <Section id="About" title={aboutInfo.sectionName ?? 'About'}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Image
            src={aboutInfo.image?.url ?? ''}
            alt="Artin's image"
            width={1000}
            height={1000}
            className={classes.img}
          />
        </Grid>
        <Grid item xs={12} md={6} className={classes.aboutContainer}>
          <div>
            {aboutInfo.description?.json.content.map(
              (
                content: {
                  content: {
                    value:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | React.ReactFragment
                      | React.ReactPortal
                      | null
                      | undefined;
                  }[];
                },
                i: any
              ) => (
                <div key={`content_${i}`}>
                  <Typography
                    variant="body1"
                    component="p"
                    className={classes.about}
                  >
                    {content.content[0].value}
                  </Typography>
                  <br />
                </div>
              )
            )}
          </div>
        </Grid>
      </Grid>
    </Section>
  );
};

export default AboutContainer;
