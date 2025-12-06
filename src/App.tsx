import { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ThemeModeProvider, useThemeMode } from './context/ThemeContext';
import { createCustomTheme } from './theme/theme';

// Components
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

// Sections
import HeroSection from './sections/HeroSection/HeroSection';
import AboutSection from './sections/AboutSection/AboutSection';
import SkillsSection from './sections/SkillsSection/SkillsSection';
import ExperienceSection from './sections/ExperienceSection/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection/ProjectsSection';
import EducationSection from './sections/EducationSection/EducationSection';
import AwardsSection from './sections/AwardsSection/AwardsSection';
import ContactSection from './sections/ContactSection/ContactSection';

import './index.scss';

const AppContent = () => {
  const { mode } = useThemeMode();
  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <EducationSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </ThemeProvider>
  );
};

function App() {
  return (
    <ThemeModeProvider>
      <AppContent />
    </ThemeModeProvider>
  );
}

export default App;
