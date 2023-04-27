import React from 'react';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

export const getLinkIcon = (
  linkType: string,
  fontSize: 'small' | 'inherit' | 'medium' | 'large' | undefined = 'medium'
) => {
  switch (linkType) {
    case 'Email':
      return <EmailIcon fontSize={fontSize} />;
    case 'LinkedIn':
      return <LinkedInIcon fontSize={fontSize} />;
    case 'Github':
      return <GitHubIcon fontSize={fontSize} />;
    default:
      throw new Error('The specified link type does not exist');
  }
};
