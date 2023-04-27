import React from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { ExperienceEntry } from '@/client/generated/schemas';
import { Section } from '../common';
import DesktopExperience from './DesktopExperience';
import MobileExperience from './MobileExperience';

type ExperienceContainerProps = {
  experiences: ExperienceEntry[];
};

export const ExperienceContainer: React.FC<ExperienceContainerProps> = ({
  experiences,
}: ExperienceContainerProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Section title="Experience" id="Experience">
      {!isMobile ? (
        <DesktopExperience experiences={experiences} />
      ) : (
        <MobileExperience experiences={experiences} />
      )}
    </Section>
  );
};

export default ExperienceContainer;
