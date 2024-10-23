import React, { Component } from "react";
import { Nav, NavItem,NavLink } from "reactstrap";
import "./SideMenu.css"; // Özel stil dosyasını eklemeyi unutma

class SideMenu extends Component {
  render() {
    return (
      <div className="side-menu">
      <Nav vertical color="light">
        <NavItem>
        <NavLink  className="menu-item" href="/">Home</NavLink>
        </NavItem>
        <NavItem>
        <NavLink className="menu-item" href="/questions">Questions</NavLink>
        </NavItem>
        <NavItem>
        <NavLink className="menu-item" href="/topics">Topics</NavLink>
        </NavItem>
        <NavItem>
        <NavLink className="menu-item"  href="/favorites">Favorites</NavLink>
        </NavItem>
        <NavItem>
        <NavLink className="menu-item" href="/solutionAI">Solution In Here AI</NavLink>
        </NavItem>
      </Nav>
      </div>
    );
  }
}

export default SideMenu;
