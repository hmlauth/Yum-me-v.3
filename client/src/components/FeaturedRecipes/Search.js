import $ from "jquery";
import React, { Component } from "react";
import API from "../../utils/API";
import Header from "../Header";
import SearchCarousel from "./SearchCarousel";
import { Col, Row, Container } from "../Grid";
class Search extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <Header>
              Get Inspired!
            </Header>
          </Col>
        </Row>
        <SearchCarousel />
      </Container>
    );
  }
}

export default Search;
