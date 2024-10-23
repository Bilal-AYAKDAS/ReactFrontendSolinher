import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import SideMenu from '../menu/SideMenu';
import QuestionList from '../questions/QuestionList';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row>
          {/* Sol sütunda yan menü */}
          <Col xs="3">
            <SideMenu />
          </Col>
          {/* Sağ sütunda ürün listesi */}
          <Col xs="9">
            <QuestionList />
          </Col>
        </Row>
      </div>
    );
  }
}
