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
                <a href="#/info" class="btn btn-primary">Mas información</a>
                <hr style={{borderTop: '3px dashed #bbb'}}/>
                <a href="#/config" class="btn btn-secondary">Configuración</a>
                <hr style={{borderTop: '3px dashed #bbb'}}/>
                <a href="#/report" class="btn btn-warning">Reportar un problema</a>
                </div>
            </Card.Body>
            <Card.Footer>
                <Github></Github> <a href="https://github.com/andresdlroca" target="_blank" rel="noopener noreferrer">Andresdlroca</a>
            </Card.Footer>
        </Card>
    )
}

export default Popup;