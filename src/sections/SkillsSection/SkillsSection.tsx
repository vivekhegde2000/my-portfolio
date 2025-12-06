import { Box, Typography, Chip, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { skillCategories } from '../../data/data';
import './SkillsSection.scss';

const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      title="Skills & Expertise"
      subtitle="Technologies and tools I work with"
      background="primary"
    >
      <Box className="skills">
        <Grid container spacing={3}>
          {skillCategories.map((category, catIndex) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={category.category}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                viewport={{ once: true }}
              >
                <Box className="skills__category glass-card">
                  <Typography variant="h6" className="skills__category-title">
                    {category.category}
                  </Typography>
                  <Box className="skills__chips">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.05 }}
                        viewport={{ once: true }}
                      >
                        <Chip
                          label={skill.name}
                          className="skills__chip"
                          variant="outlined"
                        />
                      </motion.div>
                    ))}
                  </Box>
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SectionWrapper>
  );
};

export default SkillsSection;
