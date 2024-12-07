import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";
import apiClient from "../../api/apiClient";
import alertify from "alertifyjs";

function Profile({ open, onClose }) {
  const { userData } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    profile_picture: null,
    receive_email_notifications: false,
  });

  const inputRef = useRef();

  useEffect(() => {
    if (userData !=null) {
      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        role: userData.role || "employee",
        profile_picture: null,
        receive_email_notifications: userData.receive_email_notifications || false,
      });
    }
  }, [userData]);

  const handleChange = (field) => (event) => {
    const value =
      field === "receive_email_notifications"
        ? event.target.checked
        : event.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleButtonClick = () => {
    inputRef.current.click(); // Gizli input alanını tetikle
  };

  const handleFileChange = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      profile_picture: event.target.files[0], // Seçilen dosyayı al
    }));
  };
 
  const updateProfile = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formData.first_name);
    formDataToSend.append("last_name", formData.last_name);
    formDataToSend.append("role", formData.role);
    formDataToSend.append(
      "receive_email_notifications",
      formData.receive_email_notifications
    );
    if (formData.profile_picture) {
      formDataToSend.append("profile_picture", formData.profile_picture);
    }

    try {
      const response = await apiClient.put(`/auth/update/`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alertify.success(response.data.message || "Profile updated successfully!");
    } catch (error) {
        const err = error.response?.data || {};
        
        Object.entries(err).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            alertify.error(`${field}: ${messages.join(", ")}`);
          } else {
            alertify.error(`${field}: ${messages}`);
          }
        });
      }
  };

  const handleSubmit = async () => {
    await updateProfile();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>User Profile</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="First Name"
            value={formData.first_name}
            onChange={handleChange("first_name")}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={formData.last_name}
            onChange={handleChange("last_name")}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              value={formData.role}
              onChange={handleChange("role")}
            >
              <MenuItem value="employee">Employee</MenuItem>
              <MenuItem value="engineer">Engineer</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </Select>
          </FormControl>
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            <input
              ref={inputRef}
              type="file"
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
                onChange={handleChange("receive_email_notifications")}
              />
            }
            label="Receive Email Notifications"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default Profile;
