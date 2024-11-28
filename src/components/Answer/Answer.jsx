import React, { useState } from "react";
import {
  Button,
  CardActions,
  CardContent,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { Card } from "reactstrap";
import { format } from "date-fns"; // date-fns kullanımı
import alertify from "alertifyjs";
import { useDispatch } from "react-redux";
import { fetchQuestionDetail } from "../../redux/questionDetailSlice";
import AddAnswer from "../AddAnswer/AddAnswer";
import apiClient from "../../api/apiClient";

function Answer({ answer, questionId }) {
  const [editOpen, setEditOpen] = useState(false); // Modal kontrolü için state
  const dispatch = useDispatch();

  const handleEditClick = () => {
    setEditOpen(true); // Modal'ı aç
  };

  const onLikeClick = async (answerId) => {
    try {
      const response = await apiClient.post(
        `/questions/like-comment/${answerId}`
      );
      alertify.success(response.data.message);
      dispatch(fetchQuestionDetail(questionId));
    } catch (error) {
      console.error("Error liking question:", error);
      alertify.error("Failed to like question.");
    }
  };

  const onDislikeClick = async (answerId) => {
    try {
      const response = await apiClient.post(
        `/questions/dislike-comment/${answerId}`
      );
      alertify.success(response.data.message);
      dispatch(fetchQuestionDetail(questionId));
    } catch (error) {
      console.error("Error disliking question:", error);
      alertify.error("Failed to dislike question.");
    }
  };

  return (
    <div>
      <Card sx={{ padding: 2 }} style={{ width: "65rem", height: "15rem" }}>
        <CardContent>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Answer #{answer.id}</Typography>
          </Stack>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="body1">
            <strong>Answer Text:</strong> {answer.body}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Answered By:</strong> {answer.user}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Date:</strong> {format(new Date(answer.created_at), "PPpp")}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "space-between" }}>
          <div>
            <IconButton color="primary" onClick={() => onLikeClick(answer.id)}>
              <AiOutlineLike />
            </IconButton>
            <Typography component="span" sx={{ marginRight: 2 }}>
              {answer.like_count}
            </Typography>
            <IconButton
              color="error"
              onClick={() => onDislikeClick(answer.id)}
            >
              <AiOutlineDislike />
            </IconButton>
            <Typography component="span">{answer.dislike_count}</Typography>
          </div>
          <div>
            <Button
              variant="contained"
              color="warning"
              startIcon={<FiEdit />}
              onClick={handleEditClick}
            >
              Edit
            </Button>
          </div>
        </CardActions>
      </Card>

      {/* AddAnswer Modal */}
      {editOpen && (
        <AddAnswer
          isEdit={true}
          answer={answer}
          questionId={questionId}
          onClose={() => setEditOpen(false)} // Modal kapatma
        />
      )}
    </div>
  );
}

export default Answer;
