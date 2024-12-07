import { useEffect, useRef, useState } from "react";
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
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp, fetchUserData } from "../../redux/userSlice";
import alertify from "alertifyjs";
import Profile from "../Profile/Profile";
import ChangePassword from "../ChangePassword/ChangePassword";

function SignUp() {
  debugger;

  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector((state) => state.user);
  let userName ="";
 if(userData !=null){
  userName =`${userData.first_name} ${userData.last_name}`;
 }

  const [modalOpen, setModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const [profileOpen, setProfileOpen] = useState(false);
  const [changePasswdOpen, setChangePasswdOpen] = useState(false);
  
  const handleFileChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: event.target.files[0], // Seçilen dosyayı al
    }));
  };


  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    role: "",
    profile_picture: null,
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
  const inputRef = useRef();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = async () => {
    try {
      await dispatch(userSignUp(formData)).unwrap();
      alertify.success("Kayıt başarılı!");
    } catch (err) {
      console.log("Hata Detayları:", err);
    // Hata mesajları
      Object.entries(err).forEach(([field, messages]) => {
        if (Array.isArray(messages)) {
          alertify.error(`${field}: ${messages.join(", ")}`);
        } else {
          alertify.error(`${field}: ${messages}`);
        }
      });
     }
  };

  const handleButtonClick = () => {
    inputRef.current.click(); // Gizli input alanını tetikle
  };
  
  const handleProfileClose = () => setProfileOpen(false);

  
  const handleChangePasswdClose = () => setChangePasswdOpen(false);

 

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
              sx: { width: 155 }, // Menü genişliği
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
              <Typography variant="body1" onClick={()=>setProfileOpen(true)}>Profile</Typography>
            </MenuItem>
            <MenuItem>
              <Typography variant="body1" onClick={()=>setChangePasswdOpen(true)}>Change Password</Typography>
            </MenuItem>
          </Menu>
          
        </Box>
           
      ) : (
        <Button variant="contained" color="success" onClick={() => setModalOpen(true)}>
          Sign Up
        </Button>
      )}
      <Profile open={profileOpen} onClose={handleProfileClose} ></Profile>
      <ChangePassword open={changePasswdOpen} onClose={handleChangePasswdClose}  ></ChangePassword>


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
          <FormControl fullWidth >
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={formData.role}
              name="role"
              onChange={handleChange}
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="engineer">Engineer</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap" sx={{ mt: 2 }}>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              Choose File
            </Button>
            <Typography variant="body2" sx={{ color: formData.profile_picture ? "inherit" : "#aaa" }}>
              {formData.profile_picture?.name || "No file selected"}
            </Typography>
          </Box>

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
