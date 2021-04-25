import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Card, Badge } from "react-bootstrap";
import { getPrintQueue, postPrint } from "./api/print";

import printImage from "./image/printer.png";

const App = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [currentPrintData, setCurrentPrintData] = useState();

  useEffect(() => {
    let shouldFetch = true;

    const printing = async (printData) => {
      setIsAvailable(false);
      setTimeout(() => {
        setIsAvailable(true);
        shouldFetch = true;
        postPrint(printData.print_id);
      }, 10000);
    };

    const fetchPrintQueue = async () => {
      try {
        if (!shouldFetch) {
          return;
        }
        shouldFetch = false;
        const responseDatas = await getPrintQueue();
        if (responseDatas?.messages[0]) {
          setCurrentPrintData(responseDatas.messages[0]);
          printing(responseDatas.messages[0]);
        } else {
          shouldFetch = true;
        }
      } catch (error) {
        console.error(error);
        shouldFetch = true;
      }
    };

    const interval = setInterval(() => {
      fetchPrintQueue();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

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
                    <Card.Text>
                      Currently printing: {currentPrintData?.user_name}
                    </Card.Text>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default App;
