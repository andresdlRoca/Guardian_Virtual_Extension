import { Button, Card } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

function Popup() {
    return (
        
        <Card style={{width: '18rem'}} className="mx-auto text-center">
            <Card.Body>
                <Card.Title>Guardian Virtual</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Detección de Phishing</Card.Subtitle>
                <Card.Text>
                    Esta extensión te permitira detectar phishing en texto seleccionado.
                    Solo selecciona el texto y da click derecho para analizar.
                </Card.Text>
            </Card.Body>
            <Card.Body>
                <div className="d-grid gap-2">
                <Button variant="primary">Más información</Button>
                <hr style={{borderTop: '3px dashed #bbb'}}/>
                <Button variant="secondary">Configuración</Button>
                <hr style={{borderTop: '3px dashed #bbb'}}/>
                <Button variant="warning">Reportar un problema</Button>
                </div>
            </Card.Body>
            <Card.Footer>
                <Github></Github> <a href="https://github.com/andresdlroca">Andresdlroca</a>
            </Card.Footer>
        </Card>
    )
}

export default Popup;