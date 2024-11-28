import { useState } from "react";
import { Nav, NavItem, NavLink, Button } from "reactstrap";
import { useLocation } from "react-router-dom"; // React Router'dan useLocation
import "bootstrap/dist/css/bootstrap.min.css";
import "./SideBar.css";
import { IoIosHome } from "react-icons/io";
import { FaRobot } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Mevcut rotayı alır

  const toggleSidebar = () => setIsOpen(!isOpen);

  // Aktif menü stilini tanımlayın
  const getActiveClass = (path) => (location.pathname === path ? "active" : "");

  return (
    <div className="d-flex">
      {/* Yan Menü */}
      <div
        className={`bg-light border-end sidebar ${
          isOpen ? "d-block" : "d-none d-md-block"
        }`}
        style={{ minWidth: "250px", maxWidth: "250px", height: "100vh" }}
      >
        <Nav vertical color="light">
          <NavItem className="menu">
            <NavLink href="../" className={getActiveClass("/")}>
              <IoIosHome /> Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/myQuestions"
              className={getActiveClass("/myQuestions")}
            >
              <VscAccount /> My Questions
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/favoriQuestions"
              className={getActiveClass("/favoriQuestions")}
            >
              <MdFavorite style={{ marginRight: "5px" }} /> Favorites
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="/solinherAI"
              className={getActiveClass("/solinherAI")}
            >
              <FaRobot style={{ marginRight: "5px" }} /> Solinher AI
            </NavLink>
          </NavItem>
        </Nav>
      </div>

      {/* İçerik ve Toggle Düğmesi */}
      <div className="flex-grow-1">
        <Button
          color="primary"
          onClick={toggleSidebar}
          className="m-3 d-md-none"
        >
          Menü
        </Button>
      </div>
    </div>
  );
}

export default Sidebar;
