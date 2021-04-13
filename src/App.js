import React, { useState } from "react";
import { Container, Row, Col, Navbar, Card, Badge } from "react-bootstrap";

import printImage from "./image/printer.png";

const App = () => {
  const [isAvailable, setIsAvailable] = useState(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <img
          src={printImage}
          alt="print"
          style={{ height: "30px", marginRight: "16px" }}
        />
        <Navbar.Brand href="/">PaaS</Navbar.Brand>
      </Navbar>
      <div style={{ height: "100vh", width: "100vw", overflow: "hidden" }}>
        <Container style={{ padding: "16px" }}>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>Printer 1</Card.Title>
                  <Badge variant={isAvailable ? "success" : "warning"}>
                    {isAvailable ? "Available" : "Printing"}
                  </Badge>
                  {isAvailable ? null : (
                    <Card.Text>Currently printing: {"Melvin"}</Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
            <Col>Print log here</Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default App;
