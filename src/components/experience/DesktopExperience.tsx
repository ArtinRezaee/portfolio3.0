import React from 'react';
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab';
import Image from 'next/image';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { ExperienceEntry } from '@/client/generated/schemas';
import { makeStyles } from '@/config/makeStyles';

const useStyles = makeStyles()((theme) => ({
  timelineContainer: {
    textAlign: 'start',
    width: '300px',
  },
  itemTextContainer: {
    textAlign: 'start',
  },
  itemContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  listItem: {
    color: theme.palette.grey[400],
  },
  img: {
    objectFit: 'cover',
    borderRadius: '50%',
    height: theme.spacing(5),
    width: theme.spacing(5),
  },
}));

type DestopExperienceProps = {
  experiences: ExperienceEntry[];
};

export const DesktopExperience: React.FC<DestopExperienceProps> = ({
  experiences,
}: DestopExperienceProps) => {
  const { classes } = useStyles();

  return (
    <Timeline position="right">
      {experiences.map((experience, i) => (
        <TimelineItem key={i}>
          <TimelineContent sx={{ maxWidth: '700px' }}>
            <div className={classes.itemContainer}>
              <div className={classes.timelineContainer}>
                <Typography variant="h6">
                  {experience.isPresent ? 'Present' : experience.dateRange}
                </Typography>
                <Typography variant="body1">
                  {experience.role}, {experience.company}
                </Typography>
              </div>
            </div>
          </TimelineContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <Image
                src={experience.logo?.url ?? ''}
                alt={`${experience.company}_logo`}
                width={500}
                height={500}
                className={classes.img}
              />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineOppositeContent className={classes.itemTextContainer}>
            <Typography variant="body1">{experience.roleHeader}</Typography>
            <List dense>
              {experience.roleDescription?.map((item) => (
                <ListItem key={item}>
                  <ListItemText className={classes.listItem}>
                    - {item}
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </TimelineOppositeContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

export default DesktopExperience;
