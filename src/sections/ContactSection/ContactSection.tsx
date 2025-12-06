import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Alert,
} from '@mui/material';
import { motion } from 'framer-motion';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import SendIcon from '@mui/icons-material/Send';
import SectionWrapper from '../../components/SectionWrapper/SectionWrapper';
import { personalInfo } from '../../data/data';
import './ContactSection.scss';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this to a backend
    console.log('Form submitted:', formData);
    setSnackbar({ open: true, message: 'Message sent successfully!', severity: 'success' });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    {
      icon: <EmailIcon />,
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: <PhoneIcon />,
      label: 'Phone',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: <PhoneIcon />,
      label: 'Alternative Phone',
      value: personalInfo.alternativePhone,
      href: `tel:${personalInfo.alternativePhone}`,
    },
    {
      icon: <LocationOnIcon />,
      label: 'Location',
      value: personalInfo.location,
      href: null,
    },
  ];

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Have a project in mind? Let's work together!"
      background="secondary"
    >
      <Box className="contact">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, lg: 5 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box className="contact__info">
                <Typography variant="h4" className="contact__info-title">
                  Let's talk about everything!
                </Typography>
                <Typography variant="body1" className="contact__info-text">
                  Feel free to reach out to me. I'm always open to discussing new projects, 
                  creative ideas, or opportunities to be part of your vision.
                </Typography>

                <Box className="contact__details">
                  {contactInfo.map((info) => (
                    <Box
                      key={info.label}
                      className="contact__detail"
                      component={info.href ? 'a' : 'div'}
                      href={info.href || undefined}
                    >
                      <Box className="contact__detail-icon">
                        {info.icon}
                      </Box>
                      <Box>
                        <Typography variant="body2" className="contact__detail-label">
                          {info.label}
                        </Typography>
                        <Typography variant="body1" className="contact__detail-value">
                          {info.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>

                <Box className="contact__social">
                  <Typography variant="body2" className="contact__social-label">
                    Follow me on
                  </Typography>
                  <Box className="contact__social-links">
                    <IconButton
                      component="a"
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__social-link"
                    >
                      <LinkedInIcon />
                    </IconButton>
                    <IconButton
                      component="a"
                      href="https://github.com/vivekhegde2000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact__social-link"
                    >
                      <GitHubIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, lg: 7 }}>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Box component="form" onSubmit={handleSubmit} className="contact__form glass-card">
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="contact__input"
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Your Email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="contact__input"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="contact__input"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      multiline
                      rows={4}
                      className="contact__input"
                    />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      endIcon={<SendIcon />}
                      className="contact__submit"
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </SectionWrapper>
  );
};

export default ContactSection;
