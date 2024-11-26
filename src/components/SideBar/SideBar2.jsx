import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home, Favorite, Person, Android } from '@mui/icons-material';

const Sidebar = () => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100vh',
        backgroundColor: '#f5f5f5',
        position: 'static', // Menü sabitleniyor
        left: 60, // Sol tarafa yapıştırılıyor
        top: 64,
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 3,
        zIndex: 1000,
      }}
    >
      <List>
        <ListItem button component="a" href="../">
          <ListItemIcon>
            <Home color="warning" />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component="a" href="/myQuestions">
          <ListItemIcon>
            <Person color="primary" />
          </ListItemIcon>
          <ListItemText primary="My Questions" />
        </ListItem>
        <ListItem button component="a" href="/favoriQuestions">
          <ListItemIcon>
            <Favorite color="secondary" />
          </ListItemIcon>
          <ListItemText secondary="Favorites" />
        </ListItem>
        <ListItem button component="a" href="/solinherAI">
          <ListItemIcon>
            <Android color="primary" />
          </ListItemIcon>
          <ListItemText primary="Solinher AI" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
