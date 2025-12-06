import type { ReactNode } from 'react';
import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './SectionWrapper.scss';

interface SectionWrapperProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  background?: 'primary' | 'secondary';
}

const SectionWrapper = ({
  id,
  title,
  subtitle,
  children,
  className = '',
  background = 'primary',
}: SectionWrapperProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <Box
      component="section"
      id={id}
      ref={ref}
      className={`section section--${background} ${className}`}
    >
      <Box className="section-container section-padding">
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section__header"
          >
            {title && (
              <Typography variant="h2" className="section__title">
                {title.split(' ').map((word, i) => (
                  <span key={i}>
                    {i === title.split(' ').length - 1 ? (
                      <span className="gradient-text">{word}</span>
                    ) : (
                      word + ' '
                    )}
                  </span>
                ))}
              </Typography>
            )}
            {subtitle && (
              <Typography variant="body1" className="section__subtitle">
                {subtitle}
              </Typography>
            )}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {children}
        </motion.div>
      </Box>
    </Box>
  );
};

export default SectionWrapper;
