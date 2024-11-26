import { useState,useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, logout,checkToken } from "../../redux/userSlice";


function Login() {
  const dispatch = useDispatch();

  const { isLoggedIn, loading, error } = useSelector((state) => state.user);

  const handleLogin = () => {
    dispatch(userLogin({ email, password }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  // Sayfa yüklendiğinde `checkToken`'ı çağır
  useEffect(() => {
    dispatch(checkToken());
  }, [dispatch]);

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  

  return (
    <div>
      {isLoggedIn ? (
         <Button color="danger"
         onClick={handleLogout}>
         <FontAwesomeIcon
           icon={faSignOutAlt}
           className="me-3"
         />Logout
       </Button>
        
      ) : (
        <Button color="success" onClick={toggleModal}>
        <FontAwesomeIcon icon={faUser} className="me-3" />
          Login
        </Button>
      )}

      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Login</ModalHeader>
        <ModalBody>
          <FormGroup floating>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={handleChange}
            />
            <Label for="email">Email</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={handleChange}
            />
            <Label for="password">Password</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleLogin}>
            Login
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Login;

