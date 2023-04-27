import React from 'react';
import Image from 'next/image';
import { useScroll } from '@/hooks/useScrolls';
import { makeStyles } from '@/config/makeStyles';

const useStyles = makeStyles()((theme) => ({
  image: {
    cursor: 'pointer',
  },
}));

type LogoComponentProps = {
  width: number | `${number}`;
  height: number | `${number}`;
  navigateTo?: string;
  classes?: Partial<ReturnType<typeof useStyles>['classes']>;
};

export const LogoComponent: React.FC<LogoComponentProps> = ({
  height,
  width,
  navigateTo = 'Home',
  ...rest
}: LogoComponentProps) => {
  const { executeScroll } = useScroll();
  const { classes } = useStyles(undefined, { props: rest });

  return (
    <Image
      src="/images/myLogo.png"
      width={width}
      height={height}
      alt="Artin's logo"
      className={classes.image}
      onClick={() => executeScroll(navigateTo)}
    />
  );
};

export default LogoComponent;
