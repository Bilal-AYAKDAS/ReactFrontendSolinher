import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  InputBase,
  Box,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import { useDispatch } from "react-redux";
import { fetchFilteredQuestions } from "../../redux/questionsSlice";
import { useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

function Navi() {
  const [search,setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [tagOptions, setTagOptions] = useState([]);

  const dispatch = useDispatch();
   const navigate = useNavigate();

  const searchQuestion =()=>{
    var searchParams = `search=${search}`
    
    selectedTags.map((tag)=>{
      searchParams = `${searchParams}&tags__name=${tag}`
    })
    dispatch(fetchFilteredQuestions(searchParams));
    navigate(`/`);

  }
  
  const fetchTags =  async () => {
    try {
      const response = await apiClient.get("/questions/all-tags/");
      console.log("response", response.data);
      let tags_array =[];
      response.data.map((tag) => {
        tags_array.push(tag.name);
      });

      setTagOptions(tags_array);
    } catch (error) {
      console.error("Error fetching tags:", error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);
  
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo  */}
        <Box display="flex" alignItems="center">
          <IconButton
            variant="outlined"
            edge="start"
            color="inherit"
            sx={{ marginRight: 1 }}
          >
            <HelpCenterIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="a"
            href="/"
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            Solinher
          </Typography>
        </Box>

        <Box
          display="flex"
          alignItems="center"
          sx={{
            backgroundColor: "#f1f3f4",
            borderRadius: "8px",
            padding: "2px 8px",
            flexGrow: 1,
            maxWidth: "800px",
            marginX: 2,
          }}
        >
          <FormControl sx={{ marginLeft: 0, minWidth: 150, maxWidth: 170 }}>
            <Select
              multiple
              value={selectedTags}
              onChange={(e)=> setSelectedTags(e.target.value)}
              displayEmpty
              renderValue={() => {
                  return <span style={{ color: "#aaa" }}>Tags...</span>; // Placeholder
                
              }}
            >
              {tagOptions.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <InputBase
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            sx={{ paddingLeft: 1 }}
          />
          <IconButton type="button" color="primary"
            onClick={()=>searchQuestion()}>
            <FontAwesomeIcon icon={faSearch} />
          </IconButton>
        </Box>

        {/* Login ve SignUp Butonları */}
        <Box display="flex" alignItems="center" style={{ marginRight: "30px" }}>
          <SignUp />
          <Login />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navi;
