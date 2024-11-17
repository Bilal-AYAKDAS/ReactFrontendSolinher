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
import UserMenu from "./UserMenu";

function SignUp() {
  const [userIsLogedIn,setUserIsLogedIn] = useState(false);
  const userName = "Kullanıcı Adı";
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    getTokenFromLocalStorage(); // Sayfa yüklendiğinde token kontrolünü yap
  }, []);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    role: "",
    profile_picture: "",
    receive_email_notifications: false
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleResponse = (response) => {
    if (response.ok) {
      return response.json();
    }
    const error = response.text();
    throw new Error(error);
  };

  const handleError = (error) => {
    console.log("Bir Hata oluştu");
    throw error;
  };

  const userSignUpApi = (userInfo) => {
    console.log(userInfo);
    return fetch("http://127.0.0.1:8000/api/auth/register/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then(handleResponse)
      .catch(handleError);
  };

  const userSignUp = () => {
    const userInfo = formData;
    return userSignUpApi(userInfo)
      .then((userToken) => {
        localStorage.setItem("accessToken", userToken.access);
        localStorage.setItem("refreshToken", userToken.refresh);
        setUserIsLogedIn(true);
        alertify.success("User created successfully!");
        setModalOpen(false);
        
      })
      .catch((error) => {
        throw error;
      });
  };

  const getTokenFromLocalStorage = () =>{
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if(accessToken!=null && refreshToken !=null){
      setUserIsLogedIn(true);
    }
  }




  // const getUserInfo
 

  //user token varmı diye kontrol et
  //user token varsa user bilgilerini çek
  //username userName değişkenine ata
  //user girişini bu değişkene ata

  

  return (
    <div>
      {userIsLogedIn ? (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} className="ms-3">
          <DropdownToggle caret color="light">
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
          <Button color="primary" onClick={userSignUp}>
            Register
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default SignUp;
