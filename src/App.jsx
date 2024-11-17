import "./App.css";
import Navi from "./Navi";
import Sidebar from "./SideBar";
import Question from "./Question";
import { Container, Row, Col } from "reactstrap";

function App() {
  

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <Navi/>
          </Col>
        </Row>
        <Row>
          <Col xs="3">
            <Sidebar />
          </Col>
          <Col xs="9">
            <Question />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
