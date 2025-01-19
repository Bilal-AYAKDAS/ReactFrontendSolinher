import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
import alertify from "alertifyjs";
import { useDispatch } from "react-redux";
import { fetchQuestionDetail } from "../../redux/questionDetailSlice";
import apiClient from "../../api/apiClient";

function AddAnswer({ isEdit = false, answer = {}, questionId, onClose }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [body, setBody] = useState(""); // Cevap metni
  const [hasAccessToken, setHasAccessToken] = useState(false);

  const dispatch = useDispatch();

  // Edit modunda mevcut cevabı yükle
  useEffect(() => {
    if (isEdit && answer) {
      setBody(answer.body || "");
      setDialogOpen(true); // Düzenleme modunda modal otomatik açılır
    }
  }, [isEdit, answer]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setHasAccessToken(!!token); // Eğer token varsa `true` yap
  }, []);

  // Modalı aç/kapat
  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    if (onClose) onClose(); // Modal kapandığında üst bileşene haber ver
  };

  // Cevap kaydetme veya düzenleme API çağrısı
  const saveAnswerApi = async (answerInfo) => {
    try {
      const url = isEdit
        ? `/questions/edit-comment/${answer.id}`
        : `/questions/create-comment/`;
      const response = isEdit
        ? await apiClient.patch(url, answerInfo)
        : await apiClient.post(url, answerInfo);

      alertify.success(
        isEdit
          ? "Successfully updated your answer!"
          : "Successfully added your answer!"
      );
      return response.data;
    } catch (error) {
      console.error("Error saving answer:", error.response?.data || error.message);
      alertify.error("Failed to save answer. Please check your input.");
      throw error;
    }
  };

  // Cevap kaydetme/düzenleme işlemi
  const saveAnswer = async () => {
    console.log(questionId)

    if (!body || !questionId) {
      alertify.error("Please fill in the required fields.");
      return;
    }

    const answerInfo = {
      question: questionId, // Soru ID
      body, // Cevap metni
    };

    try {
      await saveAnswerApi(answerInfo);
      setDialogOpen(false); // Modal'ı kapat
      dispatch(fetchQuestionDetail(questionId)); // Redux üzerinden detayları yenile
      if (onClose) onClose(); // Modal kapandığında üst bileşene haber ver
    } catch (error) {
      console.error("Failed to save answer:", error);
      alertify.error("Failed to save answer.");
    }
  };

  const renderWithoutAccessToken = () => (
    <>
    </>
  );
  const renderWithAccessToken = () => (
    <Box>
    {/* Add/Edit Answer Button */}
    {!isEdit && (
      <Button
        variant="contained"
        color="success"
        onClick={() => setDialogOpen(true)}
      >
        Add Answer
      </Button>
    )}

    {/* Modal (Dialog) */}
    <Dialog open={dialogOpen} onClose={toggleDialog} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? "Edit Answer" : "New Answer"}</DialogTitle>
      <DialogContent>
        <TextField
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          label="Answer Text"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Enter your answer"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="secondary"
          onClick={toggleDialog}
        >
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={saveAnswer}>
          {isEdit ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
  );

  return (
    <Box>
      {hasAccessToken ? renderWithAccessToken() : renderWithoutAccessToken()}
    </Box>
  );
}

export default AddAnswer;
