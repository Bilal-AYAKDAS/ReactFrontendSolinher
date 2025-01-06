import  { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, logout, checkToken } from "../../redux/userSlice";
import alertify from "alertifyjs";

function Login() {
  const dispatch = useDispatch();

  const { isLoggedIn, loading, error } = useSelector((state) => state.user);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");



  // Sayfa yüklendiğinde `checkToken` çağrılır
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);
 
  const handleLogin = async () => {
    try {
      await dispatch(userLogin({ email, password })).unwrap();
      alertify.success("Succesfully Login!");
      toggleDialog();
    } catch (err) {
      console.log("Hata Detayları:", err);

      if (err?.details?.non_field_errors) {
        alertify.error(err.details.non_field_errors.join(", "));
      } else {
        alertify.error("Login failed. Please check your credentials.");
      }
      
      // Yönlendirmeyi biraz geciktirin
      setTimeout(() => {
        location.href = "/";
      }, 300); // 3 saniye bekleme


     }
  };



  const handleLogout = () => {
    dispatch(logout());
  };

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Button
          variant="contained"
          color="error"
          sx={{ml:1}}
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          sx={{ml:1}}
          startIcon={<AccountCircleIcon />}
          onClick={toggleDialog}
        >
          Login
        </Button>
      )}

      <Dialog open={dialogOpen} onClose={toggleDialog} maxWidth="xs" fullWidth>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          {error && (
            <p style={{ color: "red", marginTop: "10px" }}>
              {error || "Login failed. Please try again."}
            </p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleLogin}
            color="primary"
            variant="contained"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default Login;