import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import "./Question.css";
import { useLocation, useNavigate } from "react-router-dom";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { fetchQuestions } from "../../redux/questionsSlice"; // Redux action
import { fetchQuestionsByUser } from "../../redux/myQuestionsSlice"; // Redux action
import alertify from "alertifyjs";
import AddQuestion from "../AddQuestion/AddQuestion";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import apiClient from "../../api/apiClient";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";

function Question({ question }) {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch(); // Redux dispatch
  const [editingQuestion, setEditingQuestion] = useState(false); // Edit modal state
  const [isFavorited, setIsFavorited] = useState(false); // Favori durumu

  const handleDetailClick = (id) => {
    navigate(`/question/${id}`); // Navigate to question detail page
  };

  const onLikeClick = async (id) => {
    try {
      const response = await apiClient.post(`/questions/like-question/${id}`);
      alertify.success(response.data.message);
      if (location.pathname === "/myQuestions") {
        dispatch(fetchQuestionsByUser())
      }else{
        dispatch(fetchQuestions()); // Refresh the questions list
      }
    } catch (error) {
      console.error("Error liking question:", error);
      alertify.error("Failed to like question.");
    }
  };

  const onDislikeClick = async (id) => {
    try {
      const response = await apiClient.post(`/questions/dislike-question/${id}`);
      alertify.success(response.data.message);
      if (location.pathname === "/myQuestions") {
        dispatch(fetchQuestionsByUser())
      }else{
        dispatch(fetchQuestions()); // Refresh the questions list
      }
    } catch (error) {
      console.error("Error disliking question:", error);
      alertify.error("Failed to dislike question.");
    }
  };

  const handleEditClick = () => {
    setEditingQuestion(true); // Open edit modal
  };

  const handleSave = () => {
    setEditingQuestion(false); // Close edit modal
    dispatch(fetchQuestions()); // Refresh the questions list
  };

  const handleFavoriteClick = async (id) => {
    try {
      const response = await apiClient.post(`/questions/favorite-question/${id}`);
      setIsFavorited((prev) => !prev); // Favori durumunu tersine çevir
      alertify.success(response.data.message);
    } catch (error) {
      console.error("Error favoriting question:", error);
      alertify.error("Failed to update favorite status.");
    }
  };
  return (
    <div>
      <Card style={{ width: "65rem", height: "15rem" }}>
        <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {question.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {question.body}
        </Typography>
      </CardContent>
      <CardContent>
        <Stack direction="row" spacing={1}>
          {question.tag_names?.map((tag, index) => (
            <Chip key={index} label={tag} variant="outlined" color="primary"/>
          ))}
        </Stack>
        </CardContent>

        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>
              <IconButton color="primary" onClick={() => onLikeClick(question.id)}>
                <AiOutlineLike />
              </IconButton>
              <Typography component="span" sx={{ marginRight: 2 }}>
                {question.like_count}
              </Typography>
              <IconButton color="error" onClick={() => onDislikeClick(question.id)}>
                <AiOutlineDislike />
              </IconButton>
              <Typography component="span">{question.dislike_count}</Typography>
            </div>

           {/* Detaylar ve Düzenleme */}
           
        <div>
         
  {location.pathname === "/myQuestions" ? (
    <div>
      {/* Detail Button */}
      <Button
        variant="outlined"
        startIcon={<FontAwesomeIcon icon={faTableList} />}
        onClick={() => handleDetailClick(question.id)}
      >
        Detail
      </Button>

      {/* Edit Button */}
      <Button
        variant="outlined"
        color="warning"
        startIcon={<FiEdit />}
        sx={{ marginLeft: 1 }}
        onClick={handleEditClick}
      >
        Edit
      </Button>
    </div>
  ) : (
    <div>
      {/* Detail Button */}
      <Button
        variant="outlined"
        startIcon={<FontAwesomeIcon icon={faTableList} />}
        onClick={() => handleDetailClick(question.id)}
      >
        Detail
      </Button>
     {/* Favori */}
     <IconButton
              color="secondary"
              onClick={() => handleFavoriteClick(question.id)}
            >
              {isFavorited ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
    </div>
  )}
</div>


       
      </CardActions>

      {/* Düzenleme Modalı */}
      {editingQuestion && (
        <AddQuestion
          isEdit={true}
          question={question}
          onSave={handleSave}
          onClose={() => setEditingQuestion(false)}
        />
      )}
    </Card>

      {/* Edit Modal */}
      {editingQuestion && (
        <AddQuestion
          isEdit={true}
          question={question}
          onSave={handleSave} // Callback to handle save and refresh
          onClose={() => setEditingQuestion(false)} // Close modal callback
        />
      )}
    </div>
  );
}

export default Question;
