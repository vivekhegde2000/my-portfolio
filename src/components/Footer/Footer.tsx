import { Box, Typography, IconButton, Divider } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import { personalInfo } from '../../data/data';
import './Footer.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" className="footer">
      <Box className="section-container">
        <Divider className="footer__divider" />
        <Box className="footer__content">
          <Box className="footer__info">
            <Typography variant="h6" className="footer__logo gradient-text">
              Vivek Hegde
            </Typography>
            <Typography variant="body2" className="footer__tagline">
              Frontend Developer | React Specialist
            </Typography>
          </Box>

          <Box className="footer__social">
            <IconButton
              component="a"
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="LinkedIn"
            >
              <LinkedInIcon />
            </IconButton>
            <IconButton
              component="a"
              href="https://github.com/vivekhegde2000"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__social-link"
              aria-label="GitHub"
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              component="a"
              href={`mailto:${personalInfo.email}`}
              className="footer__social-link"
              aria-label="Email"
            >
              <EmailIcon />
            </IconButton>
          </Box>

          <Typography variant="body2" className="footer__copyright">
            © {currentYear} Vivek Hegde. Made with{' '}
            <FavoriteIcon className="footer__heart" /> using React & TypeScript
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
