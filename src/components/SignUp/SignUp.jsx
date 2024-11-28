import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp, fetchUserData } from "../../redux/userSlice";
import alertify from "alertifyjs";

function SignUp() {
  const dispatch = useDispatch();
  const { isLoggedIn, userName } = useSelector((state) => state.user);

  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu = Boolean(anchorEl);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    role: "",
    profile_picture: "",
    receive_email_notifications: false,
  });

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchUserData());
    }
  }, [dispatch, isLoggedIn]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = () => {
    dispatch(userSignUp(formData))
      .unwrap()
      .then(() => {
        alertify.success("User registered successfully!");
        setModalOpen(false);
      })
      .catch((err) => {
        alertify.error(err || "An error occurred during registration.");
      });
  };

  return (
    <div>
      {isLoggedIn ? (
        <Box display="flex" alignItems="center">
          <IconButton onClick={handleMenuClick}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Typography variant="body1" sx={{ ml: 1,mr:2 }}>
            {userName}
          </Typography>
          <Menu
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleMenuClose}
            PaperProps={{
              sx: { width: 100 }, // Menü genişliği
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
          >
            <MenuItem>
              <Typography variant="body1">Profile</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body1">Settings</Typography>
            </MenuItem>
          
          </Menu>
        </Box>
      ) : (
        <Button variant="contained" color="success" onClick={() => setModalOpen(true)}>
          Sign Up
        </Button>
      )}

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Confirm Password"
            name="password2"
            type="password"
            value={formData.password2}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="First Name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Last Name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Profile Picture URL"
            name="profile_picture"
            value={formData.profile_picture}
            onChange={handleChange}
            variant="outlined"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.receive_email_notifications}
                onChange={handleChange}
                name="receive_email_notifications"
              />
            }
            label="Receive Email Notifications"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalOpen(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSignUp} color="primary" variant="contained">
            Register
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SignUp;
