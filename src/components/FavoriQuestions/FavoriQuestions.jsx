import { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import Question from "../Question/Question";
import apiClient from '../../api/apiClient';

function FavoriQuestions() {
  const [questionsApi,setQuestionApi] =useState([])

  const getQuestions = async()=>{
  //Buraya local storageden userTokenı alıp header olarak ekle ve yolla kullanıcıya ait sorular gelsin
  const data = await apiClient.get("/questions/favorited-questions/");
    setQuestionApi(data.data);
  }

  useEffect(() => {
    getQuestions();
  }, []);

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
  )
}

export default FavoriQuestions