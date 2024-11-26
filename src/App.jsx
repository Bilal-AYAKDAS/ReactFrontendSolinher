import "./App.css";
import Navi from "./components/Navi/Navi";
import Sidebar from "./components/SideBar/SideBar";
import QuestionDetail from "./components/QuestionDetail/QuestionDetail";
import MyQuestions from "./components/MyQuestions/MyQuestions";
import FavoriQuestions from "./components/FavoriQuestions/FavoriQuestions";
import MainPage from "./components/MainPage/MainPage";

import { Container, Row, Col } from "reactstrap";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import ChatBot from "./components/ChatBot/ChatBot";

function App() {
  const location = useLocation();

  return (
    <div>
      <Container fluid className="ms-5">
        <Row>
          <Col xs="12" style={{marginRight:"50px"}}>
            <Navi />
          </Col>
        </Row>
        <Row className="gx-1">
          <Col xs="2">
            <Sidebar />
          </Col>
          <Col xs="10" className="py-3">
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                <Route
                  path="/"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <MainPage />
                    </motion.div>
                  }
                />
                <Route
                  path="/question/:id"
                  element={
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <QuestionDetail />
                    </motion.div>
                  }
                />
                <Route
                  path="/myQuestions"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <MyQuestions />
                    </motion.div>
                  }
                />
                <Route
                  path="/favoriQuestions"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <FavoriQuestions />
                    </motion.div>
                  }
                />
                <Route
                  path="/solinherAI"
                  element={
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5 }}
                    >
                      <ChatBot />
                    </motion.div>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
