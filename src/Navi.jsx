import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavbarText,
  Input,
  Button,
} from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap stilini dahil edin
import "./Navi.css";
import Login from "./Login";
import SignUp from "./SignUp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Navi() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">SolinHere</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav
            className="mx-auto d-flex justify-content-center align-items-center"
            navbar
          >
            <NavItem className="me-2">
              <Input
                bsSize="sm"
                className="search-input"
                placeholder="Search..."
              />
            </NavItem>
            <NavItem>
              <Button color="primary" className="searchBtn">
                {" "}
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </NavItem>
          </Nav>
          <NavbarText>
            <SignUp />
          </NavbarText>
          <NavbarText className="ms-3">
            <Login />
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navi;
