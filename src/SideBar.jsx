import  { useState } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  Button,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideBar.css';


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="d-flex">
      {/* Yan Menü */}
      <div
        className={`bg-light border-end sidebar ${isOpen ? "d-block" : "d-none d-md-block"}`}
        style={{ minWidth: '250px', maxWidth: '250px', height: '100vh' }}
      >
        <Nav vertical color="light">
          <NavItem className='menu'>
            <NavLink href="../home">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/questions">Questions</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/topics">Topics</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/favorites">Favorites</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/solinhereAI">SolinHere AI</NavLink>
          </NavItem>
        </Nav>
      </div>

      {/* İçerik ve Toggle Düğmesi */}
      <div className="flex-grow-1">
        <Button color="primary" onClick={toggleSidebar} className="m-3 d-md-none">
          Menü
        </Button>
        
      </div>
    </div>
  );
}

export default Sidebar;
