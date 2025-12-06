import { Box, Typography, Card, CardContent, Chip, IconButton, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import GitHubIcon from '@mui/icons-material/GitHub';
import LaunchIcon from '@mui/icons-material/Launch';
import FolderIcon from '@mui/icons-material/Folder';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { projects } from '../../data/data';
import './ProjectsSection.scss';

const ProjectsSection = () => {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <SectionWrapper
      id="projects"
      title="Featured Projects"
      subtitle="Some of the projects I've worked on"
      background="primary"
    >
      <Box className="projects">
        {/* Featured Projects */}
        <Grid container spacing={3} className="projects__featured">
          {featuredProjects.map((project, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="projects__card glass-card">
                  <CardContent className="projects__card-content">
                    <Box className="projects__card-header">
                      <Box className="projects__card-icon">
                        <FolderIcon />
                      </Box>
                      <Box className="projects__card-links">
                        {project.githubUrl && (
                          <IconButton
                            component="a"
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                          >
                            <GitHubIcon />
                          </IconButton>
                        )}
                        {project.liveUrl && (
                          <IconButton
                            component="a"
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                          >
                            <LaunchIcon />
                          </IconButton>
                        )}
                      </Box>
                    </Box>

                    <Typography variant="h5" className="projects__card-title">
                      {project.title}
                    </Typography>

                    <Typography variant="body2" className="projects__card-desc">
                      {project.description}
                    </Typography>

                    <Box className="projects__card-tech">
                      {project.technologies.map((tech) => (
                        <Chip
                          key={tech}
                          label={tech}
                          size="small"
                          variant="outlined"
                          className="projects__tech-chip"
                        />
                      ))}
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

export default ProjectsSection;
