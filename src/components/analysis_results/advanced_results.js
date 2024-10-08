import { Card, Accordion } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

function AdvancedResults() {
    const location = useLocation();

    const safetyIndex = location.state.safetyIndex;
    const urls = location.state.urls;
    const fqdn = location.state.fqdn;
    const whitelistResults = location.state.whitelistResults;
    const blacklistResults = location.state.blacklistResults;
    const popularityResults = location.state.popularityResults;
    const urlResults = location.state.urlResults;
    const msgResults = location.state.msgResults;
    const contentResults = location.state.contentResults;

    const getSafetyStatusColor = () => {
        if (safetyIndex > 80) {
            return 'green';
        } else if (safetyIndex >= 60) {
            return '#FFA500';
        } else if (safetyIndex >= 0) {
            return 'red';
        } else {
            return 'black';
        }
    }

    return (

        <Card style={{width: '40rem'}} className="mx-auto text-center">
            <Card.Title>Guardián Virtual</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">Resultados Avanzados</Card.Subtitle>
            <Card.Body>
            <div className="text-center">
                <div style={{color: getSafetyStatusColor(), fontWeight: "bold"}}>
                    Indice de Seguridad: {safetyIndex}
                </div>
                <br></br>
                <Accordion alwaysOpen>
                    {fqdn.length > 0 && (
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Dominios Analizados</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {fqdn.map((url, index) => (
                                        <li key={index}>{url}</li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}

                    {whitelistResults.length > 0 && (
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Lista Blanca</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {whitelistResults.map((result, index) => (
                                        <li key={index}>
                                            <strong>{fqdn[index]}</strong> -&nbsp;
                                                <span style={{color: result.status === 'In Whitelist' ? 'green' : 'red'}}>
                                                    {result?.status || "N/A"}
                                                </span>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}

                    {blacklistResults.length > 0 && (
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Lista Negra</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {blacklistResults.map((result, index) => (
                                        <li key={index}>
                                            <strong>{fqdn[index]}</strong> -&nbsp;
                                                <span style={{color: result.status === 'In Blacklist' ? 'red' : 'green'}}>
                                                    { result?.status || "N/A"}
                                                </span>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}

                    {popularityResults.length > 0 && (
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Rango de popularidad</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {popularityResults.map((result, index) => (
                                        <li key={index}>
                                            <strong>{result.domain}</strong> -&nbsp;
                                            <span style={{color: result.rank > 500000 ? 'black' : 'green'}}>
                                                { result?.rank || "N/A"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}

                    {urlResults.length > 0 && (
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Analisis - URL</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {urls.map((url, index) => (
                                        <li key={index}>
                                            <strong>{url}</strong> -&nbsp;
                                            <span style={{color: urlResults[index]?.prediction === 'Phishing' ? 'red' : 'green'}}>
                                                { urlResults[index]?.prediction || "N/A"}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}

                    {msgResults.length > 0 && (
                        <Accordion.Item eventKey="5">
                            <Accordion.Header>Analisis - Mensaje</Accordion.Header>
                            <Accordion.Body>
                                <strong style={{color: msgResults[0]?.prediction === "Phishing" ? 'red' : 'green'}}>{msgResults[0]?.prediction || "N/A"}</strong>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}

                    {contentResults.length > 0 && (
                        <Accordion.Item eventKey="6">
                            <Accordion.Header>Analisis - Contenido Web</Accordion.Header>
                            <Accordion.Body>
                                <ul>
                                    {urls.map((url, index) => (
                                        <li key={index}>
                                            <strong>{url}</strong> -&nbsp;
                                                <span style={{color: contentResults[index]?.prediction === 'Phishing' ? 'red' : 'green'}}>
                                                    { contentResults[index]?.prediction || "N/A"}
                                                </span>
                                        </li>
                                    ))}
                                </ul>
                            </Accordion.Body>
                        </Accordion.Item>
                    )}
                </Accordion>
            
            </div>
            </Card.Body>
            <Card.Footer>
                <Github></Github> <a href="https://github.com/andresdlroca" target="_blank" rel="noopener noreferrer">Andresdlroca</a>
            </Card.Footer>
        </Card>
    )
}

export default AdvancedResults;