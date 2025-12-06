import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { education } from '../../data/data';
import './EducationSection.scss';

const EducationSection = () => {
  return (
    <SectionWrapper
      id="education"
      title="Education"
      subtitle="My academic background"
      background="secondary"
    >
      <Box className="education">
        <Grid container spacing={3} justifyContent="center">
          {education.map((edu, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={edu.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="education__card glass-card">
                  <CardContent>
                    <Box className="education__icon">
                      <SchoolIcon />
                    </Box>
                    <Typography variant="h5" className="education__degree">
                      {edu.degree}
                    </Typography>
                    <Typography variant="h6" className="education__institution">
                      {edu.institution}
                    </Typography>
                    <Box className="education__details">
                      <Box className="education__detail">
                        <LocationOnIcon />
                        <Typography variant="body2">{edu.location}</Typography>
                      </Box>
                      <Box className="education__detail">
                        <CalendarTodayIcon />
                        <Typography variant="body2">{edu.graduationDate}</Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </SectionWrapper>
  );
};

export default EducationSection;
