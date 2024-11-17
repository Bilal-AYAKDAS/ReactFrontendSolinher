import { Card,CardBody,CardTitle,ListGroup,ListGroupItem,Badge } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEye,faFileAlt } from "@fortawesome/free-solid-svg-icons";

function Question() {
  return (
    <div>
          <Card style={{ width: "18rem" }}>
            <CardBody>
              <CardTitle tag="h5">
                Question Titles ljfşanv dklvmsİDAKŞD FNSVMSŞAFKDL KBJŞGSLMSKVMFDJGNB FDBLK
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
  )
}

export default Question