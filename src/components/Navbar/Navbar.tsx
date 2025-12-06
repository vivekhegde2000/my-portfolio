import { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { motion } from 'framer-motion';
import { useThemeMode } from '../../context/ThemeContext';
import { navLinks } from '../../data/data';
import './Navbar.scss';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { mode, toggleTheme } = useThemeMode();
  
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        className={`navbar ${trigger ? 'navbar--scrolled' : ''}`}
        sx={{
          background: trigger 
            ? 'var(--color-bg-glass)' 
            : 'transparent',
          backdropFilter: trigger ? 'var(--blur-glass)' : 'none',
          borderBottom: trigger ? '1px solid var(--color-border)' : 'none',
          transition: 'all var(--transition-base)',
        }}
      >
        <Toolbar className="navbar__toolbar">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box 
              className="navbar__logo"
              onClick={() => handleNavClick('#home')}
              sx={{ cursor: 'pointer' }}
            >
              <span className="gradient-text">VH</span>
            </Box>
          </motion.div>

          {/* Desktop Navigation */}
          <Box className="navbar__links" sx={{ display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link, index) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Box
                  component="a"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Box>
              </motion.div>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
            >
              <IconButton
                onClick={toggleTheme}
                className="navbar__theme-toggle"
                aria-label="Toggle theme"
              >
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </motion.div>

            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' }, color: 'var(--color-text-primary)' }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            background: 'var(--color-bg-secondary)',
            borderLeft: '1px solid var(--color-border)',
          },
        }}
      >
        <Box className="navbar__drawer">
          <Box className="navbar__drawer-header">
            <span className="gradient-text navbar__logo">VH</span>
            <IconButton onClick={handleDrawerToggle} sx={{ color: 'var(--color-text-primary)' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.label} disablePadding>
                <ListItemButton
                  onClick={() => handleNavClick(link.href)}
                  className={activeSection === link.href.replace('#', '') ? 'active' : ''}
                >
                  <ListItemText 
                    primary={link.label}
                    sx={{ color: 'var(--color-text-primary)' }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
};

export default Navbar;
