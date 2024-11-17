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
import alertify from "alertifyjs";



function Login() {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);
  const [userIsLogedIn, setUserIsLogedIn] = useState(false);

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

  const userLoginApi = (userInfo) => {
    console.log(userInfo);
    return fetch("http://127.0.0.1:8000/api/auth/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then(handleResponse)
      .catch(handleError);
  };

  const userLogin = () => {
    const userInfo = { email, password };
    return userLoginApi(userInfo)
      .then((userToken) => {
        localStorage.setItem("accessToken", userToken.access);
        localStorage.setItem("refreshToken", userToken.refresh);
        setUserIsLogedIn(true);
        alertify.success("Successfully logged in!");
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

  useEffect(() => {
    getTokenFromLocalStorage(); // Sayfa yüklendiğinde token kontrolünü yap
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUserIsLogedIn(false); // Kullanıcı çıkış yaptı
    alertify.error("Successfully logged out");
  };

  return (
    <div>
      {userIsLogedIn ? (
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
          <Button color="primary" onClick={userLogin}>
            Login
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Login;
/**
 * Yani User Tokenı kontrol et
 * Login Bilgilerini  burda kontrol et login olmuşsa Login Çıkış butonu Göster
 * Login olmamışsa login butonu  ve  Login Modalı
 * registerda da aynı şekilde ama registerda token varsa hiç Bişey gösterme
 */
