import React, {useEffect, useState} from "react";
import { Card, Spinner } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { CircularProgressbar } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

function Analysis() {

    const [fqdn, setFqdn] = useState([]);
    const [whitelistResults, setWhitelistResults] = useState(null);
    const [blacklistResults, setBlacklistResults] = useState(null);
    const [popularityResults, setPopularityResults] = useState(null);

    // const [whitelistFlag, setwhitelistFlag] = useState(false);
    // const [blacklistFlag, setblacklistFlag] = useState(false);
    // const [popularityFlag, setpopularityFlag] = useState(false);

    const [visible, setVisible] = useState(false);
    const [visibleResult, setVisibleResult] = useState(false);

    const [safetyIndex, setSafetyIndex] = useState(100);

    console.log(new Date().toLocaleTimeString());
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.message === "Analysis") {
            console.log("Content-side:", request.data);
            setFqdn(request.data.fqdn);
            setWhitelistResults(request.data.whitelistResults);
            setBlacklistResults(request.data.blacklistResults);
            setPopularityResults(request.data.popularityResults);

            setVisible(true);
        }
    });

    useEffect(() => {
        if(!fqdn) {
            setFqdn(null);
            return;
        }

        if(safetyIndex === 100 && whitelistResults && blacklistResults && popularityResults) {
            let currentIndex = 100;
            if (whitelistResults.some((result) => result.status !== "In Whitelist")) { 
                setSafetyIndex(currentIndex - 33);
                currentIndex = currentIndex - 33;
            }

            console.log("Current Index 1", currentIndex);

            if (blacklistResults.some((result) => Object.keys(result).length !== 0)) {
                setSafetyIndex(currentIndex- 33);
                currentIndex = currentIndex - 33;
            }

            console.log("Current Index 2", currentIndex);

            if (popularityResults.some((result) => Number(result.rank) >= 100000)) {
                setSafetyIndex(currentIndex - 33);
                currentIndex = currentIndex - 33;
            }

        }       

        setTimeout(() => setVisibleResult(true), 5000);
    }, [fqdn, whitelistResults, blacklistResults, popularityResults, safetyIndex]);

    return (
        
        <Card style={{width: '18rem'}} className="mx-auto text-center">
            <Card.Body>
                <Card.Title>Guardián Virtual</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Análisis</Card.Subtitle>
                <Card.Text>
                </Card.Text>
            </Card.Body>
                <div className="text-center">
                    {
                        (visible && fqdn) ?
                        <div>
                            <CircularProgressbar value={safetyIndex} text={`${safetyIndex}%`} />
                        </div> :
                        <div>
                            {
                                (fqdn) ?
                                <>
                                    <Spinner animation="border" role="status"/>
                                    <Card.Text>Analizando...</Card.Text>
                                </> : 
                                <Card.Text>No se encontraron dominios en el texto seleccionado</Card.Text>
                            }
                        </div>
                    }
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