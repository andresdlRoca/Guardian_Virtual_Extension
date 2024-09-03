import { Card, Spinner } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

function Analysis() {


    console.log(new Date().toLocaleTimeString());
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.message === "Analysis") {
            console.log("Content-side:", request.data);
        }
    });

    return (
        
        <Card style={{width: '18rem'}} className="mx-auto text-center">
            <Card.Body>
                <Card.Title>Guardián Virtual</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Análisis</Card.Subtitle>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            <div className="text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <Card.Text>Analizando...</Card.Text>
            </div>


            <Card.Body>
            </Card.Body>
            <Card.Footer>
                <Github></Github> <a href="https://github.com/andresdlroca" target="_blank" rel="noopener noreferrer">Andresdlroca</a>
            </Card.Footer>
        </Card>
    )
}

export default Analysis;