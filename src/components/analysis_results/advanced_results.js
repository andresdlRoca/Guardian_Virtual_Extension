import { Card, Spinner } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { useState } from "react";

function AdvancedResults() {
    const [visible, setVisible] = useState(false);
    const [fqdn, setFqdn] = useState(null);

    const [whitelistResults, setWhitelistResults] = useState(null);
    const [blacklistResults, setBlacklistResults] = useState(null);
    const [popularityResults, setPopularityResults] = useState(null);

    const [visible_result, setVisibleResult] = useState(false);
    const [whitelistFlag, setWhitelistFlag] = useState(false);
    const [blacklistFlag, setBlacklistFlag] = useState(false);
    const [popularityFlag, setPopularityFlag] = useState(false);




    return (

        <Card style={{width: '18rem'}} className="mx-auto text-center">
            <Card.Title>Guardián Virtual</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Detección de Phishing</Card.Subtitle>
            <Card.Body>
            <div className="text-center">
                
            </div>
            </Card.Body>
            <Card.Footer>
                <Github></Github> <a href="https://github.com/andresdlroca" target="_blank" rel="noopener noreferrer">Andresdlroca</a>
            </Card.Footer>
        </Card>
    )
}

export default AdvancedResults;