import  { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import apiClient from "../../api/apiClient";
import alertify from "alertifyjs";

function ChangePassword({ open, onClose }) {
  const [formData, setFormData] = useState({
    old_password: "",
    new_password: "",
    new_password2: ""
  });

  const handleChange = (field) => (event) => {
    const value = event.target.value;
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async() => {
    try {
      const response = await apiClient.post("/auth/change-password/",formData);
      alertify.success(response.data);

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
    onClose();

    
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Old Password"
            value={formData.old_password}
            onChange={handleChange("old_password")}
            fullWidth
          />
          <TextField
            label="New Password"
            value={formData.new_password}
            onChange={handleChange("new_password")}
            fullWidth
          />
          <TextField
            label="New Password"
            value={formData.new_password2}
            onChange={handleChange("new_password2")}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Change
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ChangePassword;
