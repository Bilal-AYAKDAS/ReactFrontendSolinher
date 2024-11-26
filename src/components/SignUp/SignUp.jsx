import { useEffect, useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
  Dropdown,
  DropdownToggle,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import alertify from "alertifyjs";
import UserMenu from "../UserMenu/UserMenu";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp ,fetchUserData} from "../../redux/userSlice";
import { FaUser  } from "react-icons/fa";




function SignUp() {
  const dispatch = useDispatch();
  const { isLoggedIn,userName, loading, error } = useSelector((state) => state.user); // Redux durumlarını çekiyoruz

  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);


  useEffect(() => {
    if (isLoggedIn) {
      // Kullanıcı giriş yaptıysa fetchUserData'yı çağır
      dispatch(fetchUserData());
    }
  }, [dispatch, isLoggedIn]); 

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
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ms-3">
          <DropdownToggle caret color="light">
          <FaUser  />
            {userName}
          </DropdownToggle>
          <UserMenu/>
          
        </Dropdown>
      ) : (
        <Button color="warning" onClick={toggleModal}>
          <FontAwesomeIcon icon={faUser} className="me-3" />
          Sign Up
        </Button>
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Register</ModalHeader>

        <ModalBody>
          {/* Register form fields */}
          <FormGroup floating>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
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
              value={formData.password}
              onChange={handleChange}
            />
            <Label for="password">Password</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="password"
              name="password2"
              id="password2"
              placeholder="Confirm your password"
              value={formData.password2}
              onChange={handleChange}
            />
            <Label for="password2">Confirm Password</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              name="first_name"
              id="first_name"
              placeholder="Enter your first name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <Label for="first_name">First Name</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="Enter your last name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <Label for="last_name">Last Name</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              name="role"
              id="role"
              placeholder="Enter your role"
              value={formData.role}
              onChange={handleChange}
            />
            <Label for="role">Role</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              type="text"
              name="profile_picture"
              id="profile_picture"
              placeholder="Enter profile picture URL"
              value={formData.profile_picture}
              onChange={handleChange}
            />
            <Label for="profile_picture">Profile Picture URL</Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="receive_email_notifications"
                checked={formData.receive_email_notifications}
                onChange={handleChange}
              />
              Receive Email Notifications
            </Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSignUp}>
            Register
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignUp;
