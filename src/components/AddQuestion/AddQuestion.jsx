import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  FormControl,
  Button,
  Box,
  Card,
  Autocomplete,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import alertify from "alertifyjs";
import { useDispatch } from "react-redux";
import { fetchQuestionsByUser } from "../../redux/myQuestionsSlice";
import apiClient from "../../api/apiClient";

function AddQuestion({ isEdit = false, question = {}, onClose }) {
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);

  const tagOptions = ["Java", "Maven", "Gradle", "Spring", "Hibernate"];

  // Edit modunda gelen verileri doldur
  useEffect(() => {
    if (isEdit && question) {
      setTitle(question.title || "");
      setBody(question.body || "");
      setTags(question.tag_names || []);
      setDialogOpen(true); // Dialog'u aç
    }
  }, [isEdit, question]);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    if (onClose) onClose(); // Modal kapandığında üst bileşene haber ver
  };

  const saveQuestionApi = async (questionInfo) => {
    console.log(question.id);
    console.log(questionInfo)
    try {
      const url = isEdit
        ? `/questions/edit-question/${question.id}`
        : `/questions/create-question/`;

        let response;

        if(isEdit){
          response = await apiClient.patch(url, questionInfo);

        }else{
          response = await apiClient.post(url, questionInfo);
        }

      return response.data;
    } catch (error) {
      console.error("Error saving question:", error.response?.data || error.message);
      alertify.error("Failed to save question. Please check your input.");
      throw error;
    }
  };

  const saveQuestion = async () => {
    const questionInfo = {
      title:title,
      body:body,
      tags:tags,
    };

    try {
      await saveQuestionApi(questionInfo);
      alertify.success(
        isEdit ? "Successfully updated your question!" : "Successfully added your question!"
      );
      setDialogOpen(false);

      // Redux üzerinden soruları yenile
      dispatch(fetchQuestionsByUser());

      if (onClose) onClose(); // Modal kapandığında üst bileşene haber ver
    } catch (error) {
      console.error("Failed to save question:", error);
      alertify.error("Failed to save question.");
    }
  };

  return (
    <div>
      {!isEdit && (
        <Card
          style={{
            width: "65rem",
            marginBottom: "16px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <Button
            variant="contained"
            color="success"
            startIcon={<FontAwesomeIcon icon={faPlus} />}
            onClick={toggleDialog}
          >
            Add New Question
          </Button>
        </Card>
      )}
      <Dialog open={dialogOpen} onClose={toggleDialog} fullWidth maxWidth="md">
        <DialogTitle>{isEdit ? "Edit Question" : "New Question"}</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormControl fullWidth>
              <Autocomplete
                multiple
                freeSolo
                options={tagOptions}
                value={tags}
                onChange={(event, newValue) => setTags(newValue)}
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index}
                      variant="outlined"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            </FormControl>

            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleDialog} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={saveQuestion} color="primary" variant="contained">
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddQuestion;
