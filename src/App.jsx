import React from "react";
import { Grid, Box } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navi from "./components/Navi/Navi";
import Sidebar from "./components/SideBar/SideBar";
import QuestionDetail from "./components/QuestionDetail/QuestionDetail";
import MyQuestions from "./components/MyQuestions/MyQuestions";
import FavoriQuestions from "./components/FavoriQuestions/FavoriQuestions";
import MainPage from "./components/MainPage/MainPage";
import ChatBot from "./components/ChatBot/ChatBot";

function App() {
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
      {/* Navigation Bar */}
      <Box sx={{ flexShrink: 0 }}>
        <Navi />
      </Box>

      {/* Main Content Area */}
      <Grid container sx={{ flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <Grid
          item
          xs={2}
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 2,
            overflowY: "auto", // Sidebar için dikey scroll
          }}
        >
          <Sidebar />
        </Grid>

        {/* Main Content */}
        <Grid
          item
          xs={10}
          sx={{
            padding: 2,
            overflowY: "auto", // Ana içerik için dikey scroll
            height: "100%",    // İçeriğin tam yüksekliği
          }}
        >
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
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
