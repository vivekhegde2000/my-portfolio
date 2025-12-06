import { Box, Typography, Button, IconButton, Tooltip } from '@mui/material';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { personalInfo } from '../../data/data';
import './HeroSection.scss';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const HeroSection = () => {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Box component="section" id="home" className="hero">
      {/* Animated background */}
      <div className="hero__background">
        <div className="hero__gradient-orb hero__gradient-orb--1" />
        <div className="hero__gradient-orb hero__gradient-orb--2" />
        <div className="hero__gradient-orb hero__gradient-orb--3" />
        <div className="hero__grid" />
      </div>

      <Box className="hero__content section-container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="hero__text"
        >
          <motion.div variants={itemVariants}>
            <Typography variant="body1" className="hero__greeting">
              Hello, I'm
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h1" className="hero__name">
              {personalInfo.name}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="h2" className="hero__title">
              <span className="gradient-text">{personalInfo.title}</span>
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Typography variant="body1" className="hero__summary">
              {personalInfo.summary}
            </Typography>
          </motion.div>

          <motion.div variants={itemVariants} className="hero__cta">
            <Button
              variant="contained"
              size="large"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero__btn hero__btn--primary"
            >
              Get In Touch
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="hero__btn hero__btn--secondary"
            >
              View Projects
            </Button>
          </motion.div>

          <motion.div variants={itemVariants} className="hero__social">
            <Tooltip title="LinkedIn">
              <IconButton
                component="a"
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
              >
                <LinkedInIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="GitHub">
              <IconButton
                component="a"
                href="https://github.com/vivekhegde2000"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__social-link"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Email">
              <IconButton
                component="a"
                href={`mailto:${personalInfo.email}`}
                className="hero__social-link"
              >
                <EmailIcon />
              </IconButton>
            </Tooltip>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="hero__scroll-indicator"
          onClick={scrollToAbout}
        >
          <Typography variant="body2">Scroll Down</Typography>
          <KeyboardArrowDownIcon className="hero__scroll-arrow" />
        </motion.div>
      </Box>
    </Box>
  );
};

export default HeroSection;
