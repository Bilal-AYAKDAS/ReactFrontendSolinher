import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Question from "../Question/Question";
import { fetchQuestions } from "../../redux/questionsSlice";
import { useDispatch,useSelector } from "react-redux";

function MainPage() {
  const dispatch = useDispatch();
  const questionsApi = useSelector((state) => state.questions.questions);

  const status = useSelector((state) => state.questions.status);

  useEffect(() => {
    if (status === "idle") {
      // Soruları API'den çek
      dispatch(fetchQuestions());
    }
  }, [status, dispatch])



  return (
    <div>
      <Container fluid>
        <Row className="gx-1 gy-1">
          {questionsApi?.map((questionItem) => (
            <Col key={questionItem.id}>
              <Question key={questionItem.id} question={questionItem} />{" "}
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default MainPage;
