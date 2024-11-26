import { Container, Row, Col } from "reactstrap";
import Question from "../Question/Question";
import AddQuestion from '../AddQuestion/AddQuestion';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchQuestionsByUser } from "../../redux/myQuestionsSlice";

function MyQuestions() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.myQuestions.myQuestions);
  const status = useSelector((state) => state.myQuestions.status);
console.log(questions);
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchQuestionsByUser());
    }
  }, [status, dispatch]);

  return (
    <div>
      <Container fluid>
        <Row className="gx-1 gy-1">
          {questions?.map((questionItem) => (
            <Col key={questionItem.id}>
              <Question key={questionItem.id} question={questionItem} />
            </Col>
          ))}
          <AddQuestion onSave={() => dispatch(fetchQuestionsByUser())} />
        </Row>
      </Container>
    </div>
  );
}

export default MyQuestions;
