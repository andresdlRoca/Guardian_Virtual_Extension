import { Card } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

function Info() {
    return (
        
        <Card style={{width: '18rem'}} className="mx-auto text-center">
            <Card.Body>
                <Card.Title>Guardián Virtual</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Información general</Card.Subtitle>
                <Card.Text className="text-justify">
                    Esta extensión utiliza un enfoque basado en 4 capas principales para el analisis de phishing.
                    <br/>
                    <br/>
                    La primera capa consiste en verificar si los dominios en los URLs del contenido seleccionado se encuentran en una lista blanca, lista negra y/o lista de popularidad,
                    a partir de esto se determina si el contenido seleccionado es seguro o no.
                    <br/>
                    <br/>
                    En caso de que el contenido seleccionado sea considerado como sospechoso o no sea confirmado como seguro, se procede a las capas de analisis por modelo de Machine Learning.
                    <br/>
                    <br/>
                    En estas capas se realizan analisis sobre el texto del contenido seleccionado, los URLs encontrados y el contenido web de los URLs.
                    <br/>
                    <br/>
                    Estas capas de deteccion de phishing permiten que se realice un analisis robusto con el fin de detectar contenido malicioso de manera precisa y efectiva.
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

export default Info;