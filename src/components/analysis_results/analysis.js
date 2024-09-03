import React, {useState} from "react";
import { Card, Spinner } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

function Analysis() {

    const [fqdn, setFqdn] = useState([]);
    const [whitelistResults, setWhitelistResults] = useState([]);
    const [blacklistResults, setBlacklistResults] = useState([]);
    const [popularityResults, setPopularityResults] = useState([]);

    const [visible, setVisible] = useState(false);
    

    console.log(new Date().toLocaleTimeString());
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.message === "Analysis") {
            console.log("Content-side:", request.data);
            setFqdn(request.data.fqdn);
            setWhitelistResults(request.data.whitelistResults);
            setBlacklistResults(request.data.blacklistResults);
            setPopularityResults(request.data.popularityResults);
            // fqdn = request.data.fqdn;
            // whitelistResults = request.data.whitelistResults;
            // blacklistResults = request.data.blacklistResults;
            // popularityResults = request.data.popularityResults;
            setVisible(true);

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
                {(visible) ? 
                <div>
                    <Card.Text>
                    <b>Dominios Analizados:</b>
                    <br/>
                        {fqdn.map((fqdn, index) => {
                            return <p key={index}>{fqdn}</p>
                        })}
                    <b>Whitelist:</b>
                    {//If every element in the array is status: In Whitelist, then the domain is safe
                        (whitelistResults.every((result) => result.status === "In Whitelist")) ?
                        <p>Los dominios son seguros</p> : <p>Hay uno o mas dominios que no estan en la lista blanca</p>
                    } 
                    <b>Blacklist:</b>
                    {//If every element in the array is an empty object, then no domains are in the blacklist
                        (blacklistResults.every((result) => Object.keys(result).length === 0)) ?
                        <p>Ningún dominio está en la lista negra</p> : <p>Hay uno o mas dominios en la lista negra</p>
                    }
                    <b>Rango de Popularidad:</b>
                    {
                        (popularityResults.every((result) => Number(result.rank) < 100000)) ?
                        <p>Los dominios son altamente populares</p> : <p>Hay uno o mas dominios que no son populares</p>
                    }
                    </Card.Text>
                </div> : 
                <div>
                    <Spinner animation="border" role="status"/>
                    <Card.Text>Analizando...</Card.Text>
                </div>}

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