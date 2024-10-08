import React, { useState } from "react";
import { Card, Spinner } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { Link } from "react-router-dom";

function Analysis() {
    const [urls, setUrls] = useState([]);
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
        let index = 0;
        let totalWeight = 0;

        let weights = {
            whitelist: 0,
            blacklist: 0,
            popularity: 20,
            url: 20,
            msg: 20,
            content: 40
        }

        console.log("Data - CalcIndex:", data);

        try {
            // Check if whitelistResults array is empty
            if (data.whitelistResults.length === 0) {
                console.log("No URLs found - Whitelist");
            } else {
                // Check if all whitelist results array have {status: 'In Whitelist'}
                if (data.whitelistResults.every(result => result.status === 'In Whitelist')) {
                    index = 100;
                    return index;
                }
            }
        } catch (error) {
            console.log("No URLs found - Whitelist");
        }

        try {
            if (data.blacklistResults.length === 0) {
                console.log("No URLs found - Blacklist");
            } else {
                // Check if at least one blacklist results array have {status: 'In Blacklist'}
                if (data.blacklistResults.some(result => result.status === 'In Blacklist')) {
                    index = 0;
                    return index;
                }
            }
        } catch (error) {
            console.log("No URLs found - Blacklist");
        }

        try { // 20%
            if (data.popularityResults.length > 0) {
                totalWeight += weights.popularity;
                // Check if popularity results array have {rank: x} where x > 500000
                if (data.popularityResults.every(result => result.rank > 500000)) {
                    index += weights.popularity;
                }
            }
        } catch (error) {
            console.log("No URLs found - Popularity");
        }

        try { // 20%
            if (data.urlResults.length > 0) {
                totalWeight += weights.url;
                // Check if URL results array have {prediction: 'Safe'}
                if (data.urlResults.every(result => result.prediction === 'Safe')) {
                    index += weights.url;
                }
            }        
        } catch (error) {
            console.log("No URLs found - URL");
        }

        try { // 20%
            if (data.msgResults.length > 0) {
                totalWeight += weights.msg;
                // Check if MSG results array have {prediction: 'Safe'}
                if (data.msgResults.every(result => result.prediction === 'Safe')) {
                    index += weights.msg;
                }
            }
        } catch (error) {
            console.log("No MSGs found - Message");
        }

        try { // 40%
            if (data.contentResults.length > 0) {
                totalWeight += weights.content;
                // Check if Content results array have {prediction: 'Safe'}
                if (data.contentResults.every(result => result.prediction === 'Safe')) {
                    index += weights.content;
                }
            }
            console.log("Content Results:", data.contentResults);
        }
        catch (error) {
            console.log("No Content found - Content");
        }

        if (totalWeight > 0) {
            index = (index / totalWeight) * 100;
        }

        return index;

    }

    async function handleData(data) {
        await Promise.all([
            updateURLS(data.urls),
            updateFqdn(data.fqdn),
            updateWhitelistResults(data.whitelistResults),
            updateBlacklistResults(data.blacklistResults),
            updatePopularityResults(data.popularityResults),
            updateUrlResults(data.urlAnalysis),
            updateMsgResults(data.msgAnalysis),
            updateContentResults(data.contentAnalysis)
        ])

        return {
            urls: data.urls,
            fqdn: data.fqdn,
            whitelistResults: data.whitelistResults,
            blacklistResults: data.blacklistResults,
            popularityResults: data.popularityResults,
            urlResults: data.urlAnalysis,
            msgResults: data.msgAnalysis,
            contentResults: data.contentAnalysis
        }
    }

    async function updateURLS(urls) {
        return new Promise((resolve) => {
            setUrls(urls);
            resolve();
        });
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
                            <Link to='/advanced_results' 
                                state={{safetyIndex: safetyIndex, urls: urls, fqdn: fqdn, whitelistResults: whitelistResults, 
                                    blacklistResults: blacklistResults, popularityResults: popularityResults, 
                                    urlResults: urlResults, msgResults: msgResults, contentResults: contentResults
                                }} 
                                className="btn btn-primary">Ver Detalles</Link>

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