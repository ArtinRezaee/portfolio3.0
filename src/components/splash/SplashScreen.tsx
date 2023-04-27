import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import Image from 'next/image';
import { makeStyles } from '@/config/makeStyles';

const useStyles = makeStyles()(() => ({
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

type SplashScreenProps = {
  finishLoading: () => void;
};

export const SplashScreen: React.FC<SplashScreenProps> = ({
  finishLoading,
}: SplashScreenProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const { classes } = useStyles();

  const animate = () => {
    const loader = anime.timeline({
      complete: () => finishLoading(),
    });

    loader.add({
      targets: '#splash-logo',
      delay: 0,
      scale: [
        { value: 1, easing: 'easeOutSine', duration: 500 },
        { value: 1.25, easing: 'easeOutSine', duration: 500 },
        { value: 1, easing: 'easeOutSine', duration: 500 },
        { value: 1.25, easing: 'easeOutSine', duration: 500 },
      ],
      loop: true,
    });
  };

  useEffect(() => {
    const timeOut = setTimeout(() => setIsMounted(true), 10);
    animate();
    return () => clearTimeout(timeOut);
  });

  return (
    <div className={classes.container}>
      <Image
        id="splash-logo"
        src="/images/splash-icon.png"
        alt="ARTIN REZAEE"
        width={700}
        height={700}
      />
    </div>
  );
};

export default SplashScreen;
