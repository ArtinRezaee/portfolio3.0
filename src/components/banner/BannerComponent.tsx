import React from 'react';
import { makeStyles } from 'tss-react/mui';
import Image from '../../asset/background.jpg';
import { BannerContent } from './BannerContent';

const useStyles = makeStyles()(() => ({
  introSection: {
    height: '100vh',
    display: 'flex',
    overflow: 'hidden',
    position: 'relative',
  },
  introBg: {
    backgroundImage: `url(${Image.src})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    boxShadow: 'inset 0 0 0 2000px rgba(36, 38, 36, 0.75)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  introContainer: {
    height: '100%',
    zIndex: 2,
    display: 'flex',
    alignItems: 'center',
  },
  introContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    textAlign: 'center',
  },
}));
export const BannerComponent: React.FC = () => {
  const { classes } = useStyles();
  return (
    <section id="Home" className={classes.introSection}>
      <div
        className={classes.introBg}
        style={{ backgroundImage: `url(${Image})}` }}
      >
        <div className={classes.introContainer}>
          <div className={classes.introContent}>
            <BannerContent />
          </div>
        </div>
      </div>
    </section>
  );
};
