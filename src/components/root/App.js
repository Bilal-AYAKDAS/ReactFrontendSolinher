import React from "react";
import Navi from "../navi/Navi";
import { Container } from "reactstrap";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <Container>
        <Navi></Navi>
        <Dashboard></Dashboard>
      </Container>
    </div>
  );
}

export default App;
