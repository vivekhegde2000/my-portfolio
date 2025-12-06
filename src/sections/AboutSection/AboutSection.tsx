import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import './AboutSection.scss';

const highlights = [
  {
    icon: <WorkIcon />,
    title: '2.5+ Years',
    description: 'Professional Experience',
  },
  {
    icon: <CodeIcon />,
    title: 'React & TypeScript',
    description: 'Core Technologies',
  },
  {
    icon: <SchoolIcon />,
    title: 'MCA',
    description: 'Pursuing Masters',
  },
  {
    icon: <EmojiEventsIcon />,
    title: '3 Awards',
    description: 'Recognition & Excellence',
  },
];

const AboutSection = () => {
  return (
    <SectionWrapper
      id="about"
      title="About Me"
      subtitle="Learn more about my journey and what drives me"
      background="secondary"
    >
      <Box className="about">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, lg: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box className="about__content">
                <Typography variant="h4" className="about__heading">
                  Passionate Frontend Developer
                </Typography>
                <Typography variant="body1" className="about__text">
                  I'm a dedicated Frontend Developer based in <strong>Bengaluru, India</strong>, 
                  with over 2.5 years of hands-on experience building modern web applications. 
                  I specialize in <strong>React.js</strong> and <strong>TypeScript</strong>, 
                  creating scalable, high-performance Single-Page Applications.
                </Typography>
                <Typography variant="body1" className="about__text">
                  At <strong>NSP</strong>, I've had the opportunity to work on enterprise-level 
                  projects, including developing a Design System component library published to NPM 
                  and collaborating with <strong>ABB</strong> on a Product Dashboard Management system.
                </Typography>
                <Typography variant="body1" className="about__text">
                  I'm passionate about writing clean, maintainable code and staying up-to-date 
                  with the latest frontend technologies. When I'm not coding, I enjoy exploring 
                  new frameworks and contributing to team discussions on best practices.
                </Typography>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 6 }}>
            <Grid container spacing={2}>
              {highlights.map((item, index) => (
                <Grid size={{ xs: 6 }} key={item.title}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="about__card glass-card">
                      <CardContent>
                        <Box className="about__card-icon">
                          {item.icon}
                        </Box>
                        <Typography variant="h5" className="about__card-title">
                          {item.title}
                        </Typography>
                        <Typography variant="body2" className="about__card-desc">
                          {item.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </SectionWrapper>
  );
};

export default AboutSection;
