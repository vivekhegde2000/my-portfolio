import { Box, Typography, Card, CardContent, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import GroupsIcon from '@mui/icons-material/Groups';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { awards } from '../../data/data';
import './AwardsSection.scss';

import type { ReactNode } from 'react';

const iconMap: Record<string, ReactNode> = {
  'award-1': <StarIcon />,
  'award-2': <WorkspacePremiumIcon />,
  'award-3': <GroupsIcon />,
};

const AwardsSection = () => {
  return (
    <SectionWrapper
      id="awards"
      title="Accomplishments"
      subtitle="Recognition for excellence and dedication"
      background="primary"
    >
      <Box className="awards">
        <Grid container spacing={3} justifyContent="center">
          {awards.map((award, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={award.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                style={{ height: '100%' }}
              >
                <Card className="awards__card glass-card">
                  <CardContent>
                    <Box className="awards__icon">
                      {iconMap[award.id] || <EmojiEventsIcon />}
                    </Box>
                    <Typography variant="h5" className="awards__title">
                      {award.title}
                    </Typography>
                    <Typography variant="body2" className="awards__desc">
                      {award.description}
                    </Typography>
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

export default AwardsSection;
