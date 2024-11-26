import { useState,useEffect } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  Label,
  Input,
  ModalFooter,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import alertify from "alertifyjs";
import "./AddAnswer.css";
import apiClient from "../../api/apiClient";


function AddAnswer({ question }) {
  const [modalOpen, setModalOpen] = useState(false);
  const toggleModal = () => setModalOpen(!modalOpen);

  const [body, setBody] = useState(""); // Cevap metni
  const [questionId, setQuestionId] = useState(null); // Soru ID

  // Bileşen yüklendiğinde veya `question` değiştiğinde gerekli verileri ayarla
  useEffect(() => {
    if (question) {
      setQuestionId(question);
    }
  }, [question]);
console.log(questionId)
 
  // Cevabı kaydetmek için API çağrısı
  const saveAnswerApi = async (answerInfo) => {
    try {
      const response = await apiClient.post("/questions/create-comment/", answerInfo);
      alertify.success("Successfully added your answer!");
      return response.data;
    } catch (error) {
      console.error("Error saving answer:", error.response?.data || error.message);
      alertify.error("Failed to save answer. Please check your input.");
      throw error;
    }
  };

  // Cevap kaydetme işlemi
  const saveAnswer = async () => {
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
      setModalOpen(false); // Modal'ı kapat
    } catch (error) {
      console.error("Failed to save answer:", error);
    }
  };

  return (
    <div>
        <Button color="success" onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} className="me-3" />
          Add Answer
        </Button>
      <Modal isOpen={modalOpen} toggle={toggleModal} size="lg">
        <ModalHeader toggle={toggleModal}>Add Answer</ModalHeader>
        <ModalBody>
          <FormGroup floating>
            <Input
              className={"textarea-size"}
              type="textarea"
              name="answerText"
              id="answerText"
              placeholder="Enter your answerText"
              onChange={(e)=>setBody(e.target.value)}
            />
            <Label for="answerText">Answer</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={saveAnswer}>
            Save
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default AddAnswer;
