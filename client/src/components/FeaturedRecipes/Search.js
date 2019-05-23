import React, { Component } from "react";
// import Header from "../Header";
import SearchCarousel from "./SearchCarousel";
import { Col, Row, Container } from "../Grid";
class Search extends Component {

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="12">
            <h2 id='header'>
              Get Inspired!
            </h2>
          </Col>
        </Row>
        <SearchCarousel />
      </Container>
    );
  }
}

export default Search;
