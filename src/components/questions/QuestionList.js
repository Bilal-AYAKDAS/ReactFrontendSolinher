import React, { Component } from "react";
import { connect } from "react-redux";
import {
  CardBody,
  Card,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Badge,
} from "reactstrap";
import { bindActionCreators } from "redux";
import * as questionActions from "../../redux/actions/questionActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faFileAlt } from "@fortawesome/free-solid-svg-icons";
class QuestionList extends Component {
  componentDidMount() {
    this.props.actions.getQuestions(); // Kategorileri bileşen yüklendiğinde çağırıyoruz
  }
  render() {
    return (
      <div>
        <h1>Questions</h1>,
        <Card
          style={{
            width: "18rem",
          }}
        >
          <CardBody>
            <CardTitle tag="h5">
              Question Titles ljfşanv dklvmsİDAKŞD FNSVMSŞAFKDL
              KBJŞGSLMSKVMFDJGNB FDBLK
            </CardTitle>
          </CardBody>
          <ListGroup flush>
            <ListGroupItem>
              <Badge color="secondary">Java</Badge>
            </ListGroupItem>
            <ListGroupItem>
              <Badge color="primary">
                <FontAwesomeIcon icon={faEye} /> 4
              </Badge>

              <Badge color="success" style={{ marginLeft: "10px" }}>
                <FontAwesomeIcon icon={faFileAlt} /> 5
              </Badge>
            </ListGroupItem>
          </ListGroup>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    questions: state.questionsListReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getQuestions: bindActionCreators(questionActions.getQuestions, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionList);
