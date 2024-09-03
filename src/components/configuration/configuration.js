import { Button, Card } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

function Configuration() {
    return (
        
        <Card style={{width: '18rem'}} className="mx-auto text-center">
            <Card.Body>
                <Card.Title>Guardián Virtual</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Configuracion</Card.Subtitle>
                <Card.Text>
                </Card.Text>
            </Card.Body>
            <a href="#/" class="btn btn-primary">Volver</a>
            <Card.Body>
            </Card.Body>
            <Card.Footer>
                <Github></Github> <a href="https://github.com/andresdlroca" target="_blank" rel="noopener noreferrer">Andresdlroca</a>
            </Card.Footer>
        </Card>
    )
}

export default Configuration;