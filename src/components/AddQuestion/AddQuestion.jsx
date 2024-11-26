import { useState, useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
  Card,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import alertify from "alertifyjs";
import "./AddQuestion.css";
import { useDispatch } from "react-redux";
import { fetchQuestionsByUser } from "../../redux/myQuestionsSlice";
import apiClient from "../../api/apiClient";

function AddQuestion({ isEdit = false, question = {}, onClose }) {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [tag, setTag] = useState([]);

  // Edit modunda gelen verileri doldur
  useEffect(() => {
    if (isEdit && question) {
      setTitle(question.title || "");
      setBody(question.body || "");
      setTag(question.tags || []);
      setModalOpen(true); // Modal'ı aç
    }
  }, [isEdit, question]);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (onClose) onClose(); // Modal kapandığında üst bileşene haber ver
  };

  const saveQuestionApi = async (questionInfo) => {
    try {
      const url = isEdit
        ? `/questions/update-question/${question.id}/`
        : `/questions/create-question/`;

      const response = await apiClient.post(url, questionInfo);

      alertify.success(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error saving question:", error.response?.data || error.message);
      alertify.error("Failed to save question. Please check your input.");
      throw error;
    }
  };

  const saveQuestion = async () => {
    const questionInfo = {
      title,
      body,
      tags: tag,
    };

    try {
      await saveQuestionApi(questionInfo);
      alertify.success(
        isEdit ? "Successfully updated your question!" : "Successfully added your question!"
      );
      setModalOpen(false);

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
        <Card className="mb-3 my-card" style={{width: "65rem"}}>
          <Button
            color="success"
            style={{
              fontSize: "16px",
              padding: "10px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
            onClick={toggleModal}
          >
            <FontAwesomeIcon icon={faPlus} style={{ marginRight: "8px" }} />
            Add New Question
          </Button>
        </Card>
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>
          {isEdit ? "Edit Question" : "New Question"}
        </ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="Enter your question"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="tag">Tag</Label>
            <Input
              onChange={(e) => setTag([...e.target.selectedOptions].map((opt) => opt.value))}
              id="tag"
              name="tag"
              type="select"
              multiple
              value={tag}
            >
              <option>Java</option>
              <option>Maven</option>
              <option>Gradle</option>
              <option>Spring</option>
              <option>Hibernate</option>
            </Input>
          </FormGroup>
          <FormGroup floating>
            <Input
              className={"textarea-size"}
              type="textarea"
              name="body"
              id="body"
              placeholder="Enter your question details"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <Label for="description">Description</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => saveQuestion()}>
            {isEdit ? "Update" : "Save"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddQuestion;
