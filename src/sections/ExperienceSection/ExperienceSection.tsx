import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { experiences } from '../../data/data';
import './ExperienceSection.scss';

const ExperienceSection = () => {
  return (
    <SectionWrapper
      id="experience"
      title="Work Experience"
      subtitle="My professional journey and accomplishments"
      background="secondary"
    >
      <Box className="experience">
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="experience__item"
          >
            
            <Box className="experience__content glass-card">
              <Box className="experience__header">
                <Box>
                  <Typography variant="h5" className="experience__title">
                    {exp.title}
                  </Typography>
                  <Typography variant="h6" className="experience__company">
                    {exp.company}
                  </Typography>
                </Box>
                <Typography variant="body2" className="experience__period">
                  {exp.period}
                </Typography>
              </Box>

              <Box className="experience__highlights">
                {exp.highlights.map((highlight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    viewport={{ once: true }}
                  >
                    <Typography variant="body2" className="experience__highlight">
                      {highlight}
                    </Typography>
                  </motion.div>
                ))}
              </Box>

              {exp.technologies && (
                <Box className="experience__tech">
                  {exp.technologies.map((tech) => (
                    <Chip
                      key={tech}
                      label={tech}
                      size="small"
                      className="experience__tech-chip"
                    />
                  ))}
                </Box>
              )}
            </Box>
          </motion.div>
        ))}
      </Box>
    </SectionWrapper>
  );
};

export default ExperienceSection;
