import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
function Navi() {

  

  return (
    <AppBar position="static" color="default" elevation={1}  >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo ve Brand */}
        <Box display="flex" alignItems="center">
          <IconButton  variant="outlined" edge="start" color="inherit" sx={{ marginRight: 1 }}>
            <HelpCenterIcon/>
          </IconButton>
          <Typography variant="h6" component="a" href="/" sx={{ textDecoration: "none", color: "inherit" }}>
            Solinher
          </Typography>
        </Box>

        {/* Arama Çubuğu */}
        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: "#f1f3f4",
            borderRadius: "8px",
            padding: "2px 8px",
            flexGrow: 1,
            maxWidth: "400px",
            marginX: 2,
          }}
        >
          <InputBase
            placeholder="Search..."
            fullWidth
            sx={{ paddingLeft: 1 }}
          />
          <IconButton type="button" color="primary">
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
        </Box>

        {/* Login ve SignUp Butonları */}
        <Box display="flex" alignItems="center" style={{marginRight:"30px"}}>
          <SignUp />
          <Login/>
        
           
        </Box>

        
      </Toolbar>
    </AppBar>
  );
}

export default Navi;
