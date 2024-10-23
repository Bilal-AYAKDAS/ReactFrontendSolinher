import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import "./Navi.css"; // Özel stil dosyasını eklemeyi unutma

export default class Navi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false, // Modal state'i eklendi
      username: '', // Username state'i
      password: '', // Password state'i
    };
    this.toggle = this.toggle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);

  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal     // Modal için
    }));
  }
  
  // Input değişikliklerini kontrol eden fonksiyon
  handleInputChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Solution In Here</NavbarBrand>
            <Nav className="me-auto" navbar>
              <Form inline>
                <Input
                  type="search"
                  name="search"
                  placeholder="Search"
                  className="search-input"
                  value={this.state.searchQuery}
                  onChange={this.handleSearchChange}
                />
              </Form>
              <Button color="primary" className="searchBtn">
                <FontAwesomeIcon icon={faSearch} />
              </Button>

              <Button color="warning" className="accountBtn" size="sm"  onClick={this.toggle}>
                <FontAwesomeIcon icon={faUser} /> Login
              </Button>

              <Button color="danger" className="lgoutBtn" size="sm">
                <FontAwesomeIcon icon={faSignOutAlt} /> Logout
              </Button>
            </Nav>
        </Navbar>
        {/* Login modal */}
         {/* Login modal */}
         <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Login</ModalHeader>
          <ModalBody>
            {/* Kullanıcı adı ve şifre alanları */}
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={this.handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={this.handleInputChange}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Login
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
