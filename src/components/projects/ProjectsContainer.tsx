import React, { useCallback, useState } from 'react';
import {
  Button,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Image from 'next/image';
import classNames from 'classnames';
import { Projects } from '@/client/generated/schemas';
import { makeStyles } from '@/config/makeStyles';
import { useGtag } from '@/hooks';
import { Section } from '../common';
import ProjectDialog from './ProjectDialog';

const useStyles = makeStyles()((theme) => ({
  img: {
    maxWidth: '100%',
    minHeight: '100%',
    height: 'auto',
    width: 'auto',
  },
  projectDetails: {
    position: 'absolute',
    textAlign: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    width: '100%',
    top: '50%',
    left: '50%',
    opacity: 0,
    transform: 'translate(-50%, -50%)',
    transition: 'all 0.3s ease-in-out 0s',
    background: 'rgba(0,0,0,0.7)',
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  projectButton: {
    color: theme.palette.common.white,
    borderColor: theme.palette.common.white,
    marginTop: theme.spacing(4),
  },
  projectButtonHover: {
    color: theme.palette.common.black,
    background: `${theme.palette.common.white} !important`,
    borderColor: `${theme.palette.common.white} !important`,
    transition: 'all 0.2s ease-in-out',
  },
  hover: {
    opacity: 1,
  },
}));

type ProjectsContainerProps = {
  projects: Projects[];
};

export const ProjectsContainer: React.FC<ProjectsContainerProps> = ({
  projects,
}: ProjectsContainerProps) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { gtagEvent } = useGtag();

  const [hover, setHover] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<Projects>();
  const [projectButtonhover, setProjectButtonHover] = useState(false);
  const [openProjectDialog, setOpenProjectDialog] = useState(false);

  const handleProjectClick = (projectName: string) => {
    setOpenProjectDialog(true);
    gtagEvent({
      action: 'click',
      category: 'projects',
      label: projectName,
    });
  };

  const getColumns = () => {
    if (isMedium) return 2;
    else if (isSmall) return 1;
    else return 3;
  };

  const onProjectButtonHover = useCallback(() => {
    setProjectButtonHover(true);
  }, []);

  const removeProjectButtomHover = useCallback(() => {
    setProjectButtonHover(false);
  }, []);

  const onHover = useCallback((item: Projects) => {
    setHover(true);
    setHoveredItem(item);
  }, []);
  const removeHover = useCallback(() => {
    setHover(false);
  }, []);

  return (
    <Section title="Projects" id="Projects">
      <ImageList cols={getColumns()} rowHeight="auto">
        {projects.map((project) => (
          <ImageListItem
            key={project.name}
            cols={1}
            onMouseEnter={() => onHover(project)}
            onMouseLeave={removeHover}
          >
            <Image
              src={project.image?.url ?? ''}
              alt={`${project.name}_logo`}
              width={500}
              height={500}
              className={classes.img}
            />
            <div
              className={classNames(classes.projectDetails, {
                [classes.hover]: hover && hoveredItem?.name === project.name,
              })}
            >
              <Typography variant="h5">{project.name}</Typography>
              {project.description && (
                <Button
                  variant="outlined"
                  className={classNames(classes.projectButton, {
                    [classes.projectButtonHover]:
                      projectButtonhover && hoveredItem?.name === project.name,
                  })}
                  onMouseEnter={onProjectButtonHover}
                  onMouseLeave={removeProjectButtomHover}
                  onClick={() =>
                    handleProjectClick(project.name ?? 'NO_NAME_SUPPLIED')
                  }
                >
                  Learn More
                </Button>
              )}
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <ProjectDialog
        project={hoveredItem}
        isOpen={openProjectDialog}
        onClose={() => setOpenProjectDialog(false)}
      />
    </Section>
  );
};

export default ProjectsContainer;
