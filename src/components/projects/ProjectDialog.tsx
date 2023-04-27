import React from 'react';
import {
  Button,
  Card,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LaunchOutlined } from '@mui/icons-material';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { Projects } from '@/client/generated/schemas';
import { makeStyles } from '@/config/makeStyles';
import { useGtag } from '@/hooks';

const useStyles = makeStyles()((theme) => ({
  img: {
    maxWidth: '100%',
    minHeight: '100%',
    height: '100%',
    width: '100%',
  },
  dialogContent: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  card: {
    boxShadow: 'none',
    borderRadius: 0,
    backgroundColor: 'transparent',
    backgroundImage: 'none',
  },
  cardContent: {
    padding: theme.spacing(3),
  },
  cardActions: {
    diplay: 'flex',
    justifyContent: 'center',
  },
}));

type ProjectDialogProps = {
  isOpen: boolean;
  project?: Projects;
  onClose: () => void;
};

export const ProjectDialog: React.FC<ProjectDialogProps> = ({
  isOpen,
  project,
  onClose,
}) => {
  const { classes } = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const { gtagEvent } = useGtag();

  const handleLinkClick = (projectLink: string) => {
    gtagEvent({
      action: 'click',
      category: 'project link',
      label: projectLink,
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose} fullScreen={isSmall}>
      <DialogTitle>{project?.name}</DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Card className={classes.card}>
          <CardMedia>
            <ImageComponent
              url={project?.image?.url ?? ''}
              name={project?.name ?? ''}
            />
          </CardMedia>
        </Card>
        <DialogContentText className={classes.cardContent}>
          <ReactMarkdown>{project?.description ?? ''}</ReactMarkdown>
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.cardActions}>
        {isSmall ? (
          <>
            <Button onClick={onClose}>close</Button>
            {project?.link && (
              <Button
                href={project.link ?? ''}
                target="_blank"
                onClick={() => handleLinkClick(project.link ?? '')}
                endIcon={<LaunchOutlined />}
              >
                View
              </Button>
            )}
          </>
        ) : (
          project?.link && (
            <IconButton
              href={project.link ?? ''}
              target="_blank"
              onClick={() => handleLinkClick(project.link ?? '')}
            >
              <LaunchOutlined />
            </IconButton>
          )
        )}
      </DialogActions>
    </Dialog>
  );
};

type ImageComponentProps = {
  url: string;
  name: string;
};

const ImageComponent: React.FC<ImageComponentProps> = ({ url, name }) => {
  const { classes } = useStyles();
  return (
    <Image
      src={url}
      width="600"
      height="500"
      className={classes.img}
      alt={`${name}_image`}
    />
  );
};

export default ProjectDialog;
