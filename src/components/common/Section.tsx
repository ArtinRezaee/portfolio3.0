import React from 'react';
import { makeStyles } from '@/config/makeStyles';
import { SectionTitle } from './SectionTitle';

const useStyles = makeStyles()((theme) => ({
  customSection: {
    padding: theme.spacing(6.25, 0),
    backgroundSize: 'cover',
    overflow: 'hidden',
    backgroundPosition: '50% 50%',
    position: 'relative',
  },
  container: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

type SectionProps = {
  id: string;
  title: string;
  children: React.ReactNode;
};

export const Section: React.FC<SectionProps> = ({
  id,
  title,
  children,
}: SectionProps) => {
  const { classes } = useStyles();
  return (
    <section id={id} className={classes.customSection}>
      <div className={classes.container}>
        <SectionTitle title={title} />
        {children}
      </div>
    </section>
  );
};

export default Section;
