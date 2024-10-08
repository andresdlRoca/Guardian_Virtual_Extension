import React, {useEffect, useState} from "react";
import { Card, Spinner } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';

function Analysis() {

    const [fqdn, setFqdn] = useState([]);
    const [whitelistResults, setWhitelistResults] = useState(null);
    const [blacklistResults, setBlacklistResults] = useState(null);
    const [popularityResults, setPopularityResults] = useState(null);

    const [urlResults, setUrlResults] = useState(null);
    const [msgResults, setMsgResults] = useState(null);
    const [contentResults, setContentResults] = useState(null);

    const [visible, setVisible] = useState(false);
    
    const [safetyIndex, setSafetyIndex] = useState(100);


    const getSafetyStatus = (index) => {
        if (index > 80) {
            return { color: 'green', message: 'Contenido Seguro' };
        } else if (index >= 60) {
            return { color: '#FFA500', message: 'Contenido Sospechoso' };
        } else if (index >= 0) {
            return { color: 'red', message: 'Contenido Peligroso' };
        } else {
            return { color: 'black', message: 'Error durante analisis' };
        }
    }
    
    const { color, message } = getSafetyStatus(safetyIndex);

    console.log(new Date().toLocaleTimeString());
    chrome.runtime.onMessage.addListener(async function(request, sender, sendResponse) {
        if (request.message === "Analysis") {
            console.log("Content-side:", request.data);
            const results = await handleData(request.data);

            console.log("Results after dataHandler:", results);

            const calculatedIndex = calculateIndex(results);

            console.log("Calculated Index:", calculatedIndex);
            setSafetyIndex(calculatedIndex);
            setVisible(true);
            console.log("Data Done", new Date().toLocaleTimeString());
        }
    });

    function calculateIndex(data) {
        let index = -1;
        let counter = 0;

        console.log("Data - CalcIndex:", data);

        try {
            // Check if all whitelist results array have {status: 'In Whitelist'}
            if (data.whitelistResults.every(result => result.status === 'In Whitelist')) {
                index = 100;
                return index;
            }
        } catch (error) {
            console.log("No URLs found - Whitelist");
        }

        try {
            // Check if all blacklist results array have {status: 'In Blacklist'}
            if (data.blacklistResults.every(result => result.status === 'In Blacklist')) {
                index = 0;
                return index;
            }
        } catch (error) {
            console.log("No URLs found - Blacklist");
        }

        try { // 20%
            // Check if popularity results array have {rank: x} where x > 500000
            if (data.popularityResults.every(result => result.rank > 500000)) {
                index += 20;
                counter++;
            } else {
                counter++;
            }
        } catch (error) {
            console.log("No URLs found - Popularity");
        }

        try { // 20%
            // Check if URL results array have {prediction: 'Safe'} 
            if (data.urlResults.every(result => result.prediction === 'Safe')) {
                index += 20;
                counter++;
            } else {
                counter++;
            }
            
        } catch (error) {
            console.log("No URLs found - URL");
        }

        try { // 20%
            // Check if message results array have {prediction: 'Safe'}
            if (data.msgResults.every(result => result.prediction === 'Safe')) {
                index += 20;
                counter++;
            } else {
                counter++;
            }
        } catch (error) {
            console.log("No MSGs found - Message");
        }

        try { // 40%
            // Check if content results array have {prediction: 'Safe'}
            if (data.contentResults.every(result => result.prediction === 'Safe')) {
                index += 40;
                counter++;
            } else {
                counter++;
            }
            console.log("Content Results:", data.contentResults);
        }
        catch (error) {
            console.log("No Content found - Content");
        }

        if (counter === 0) {
            index = -1;
        } else {
            index = (index / 100) * (counter / 4) * 100;
        }

        return index;

    }

    async function handleData(data) {
        await Promise.all([
            updateFqdn(data.fqdn),
            updateWhitelistResults(data.whitelistResults),
            updateBlacklistResults(data.blacklistResults),
            updatePopularityResults(data.popularityResults),
            updateUrlResults(data.urlAnalysis),
            updateMsgResults(data.msgAnalysis),
            updateContentResults(data.contentAnalysis)
        ])

        return {
            fqdn: data.fqdn,
            whitelistResults: data.whitelistResults,
            blacklistResults: data.blacklistResults,
            popularityResults: data.popularityResults,
            urlResults: data.urlAnalysis,
            msgResults: data.msgAnalysis,
            contentResults: data.contentAnalysis
        }
    }

    async function updateFqdn(fqdn) {
        return new Promise((resolve) => {
            setFqdn(fqdn);
            resolve();
        });
    }

    async function updateWhitelistResults(whitelistResults) {
        return new Promise((resolve) => {
            setWhitelistResults(whitelistResults);
            resolve();
        });
    }

    async function updateBlacklistResults(blacklistResults) {
        return new Promise((resolve) => {
            setBlacklistResults(blacklistResults);
            resolve();
        });
    }

    async function updatePopularityResults(popularityResults) {
        return new Promise((resolve) => {
            setPopularityResults(popularityResults);
            resolve();
        });
    }

    async function updateUrlResults(urlResults) {
        return new Promise((resolve) => {
            setUrlResults(urlResults);
            resolve();
        });
    }

    async function updateMsgResults(msgResults) {
        return new Promise((resolve) => {
            setMsgResults(msgResults);
            resolve();
        });
    }

    async function updateContentResults(contentResults) {
        return new Promise((resolve) => {
            setContentResults(contentResults);
            resolve();
        });
    }

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
                        visible ? 
                        <div>
                            <CircularProgressbar value={safetyIndex} text={`${safetyIndex}%`} 
                                styles={buildStyles({
                                    pathColor: color,
                                    textColor: color,
                                    trailColor: '#d6d6d6',
                                })}
                            />
                            <div style={{color: color, fontWeight: "bold"}}>{message}</div>
                            {/* <button onClick={() => setSafetyIndex(100)}>100%</button>
                            <button onClick={() => setSafetyIndex(60)}>60%</button>
                            <button onClick={() => setSafetyIndex(40)}>40%</button> */}
                            <br></br>
                            <a href="#/advanced_results" class="btn btn-primary">Resultados Avanzados</a>
                        </div> : 
                        <div>
                            <Spinner animation="border" role="status"/>
                            <Card.Text>Analizando Contenido...</Card.Text>
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