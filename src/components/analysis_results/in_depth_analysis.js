import { Card } from "react-bootstrap";
import { Github } from "react-bootstrap-icons";

function InDepthAnalysis() {
    return (
        
        <Card style={{width: '18rem'}} className="mx-auto text-center">
            <Card.Body>
                <Card.Title>Guardián Virtual</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Detección de Phishing</Card.Subtitle>
                <Card.Text>
                    Esta extensión te permitira detectar phishing en texto seleccionado.
                    Solo selecciona el texto, da click derecho y elige analizar phishing.
                </Card.Text>
            </Card.Body>
            <Card.Body>
            <div className="text-center">
                {
                    (visible && fqdn) ? 
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
                            <p>Los dominios son seguros</p> : 
                            <>
                                <p>Los siguientes dominios no estan en la lista blanca:</p>
                                    {/*Listar dominios que no estan en lista blanca*/ 
                                    whitelistResults.map((result, index) => {
                                        if (result.status !== "In Whitelist") {
                                                return <p key={index}>{fqdn[index]}</p>
                                            }
                                        })
                                    }
                            </>
                        } 
                        <b>Blacklist:</b>
                        {//If every element in the array is an empty object, then no domains are in the blacklist
                            (blacklistResults.every((result) => Object.keys(result).length === 0)) ?
                            <p>Ningún dominio está en la lista negra</p> : 
                            <>
                                <p>Los siguientes dominios estan en la lista negra:</p>
                                {/*Listar dominios que estan en lista negra*/
                                blacklistResults.map((result, index) => {
                                    if (Object.keys(result).length !== 0) {
                                        return <p key={index}>{fqdn[index]}</p>
                                    }
                                })}
                            </>
                        }
                        <b>Rango de Popularidad:</b>
                        {
                            (popularityResults.every((result) => Number(result.rank) < 100000)) ?
                            <p>Los dominios son altamente populares</p> : 
                            <>
                                <p>Los siguientes dominios no son populares:</p>
                                {/*Listar dominios que no son populares*/
                                popularityResults.map((result, index) => {
                                    if (Number(result.rank) >= 100000) {
                                        return <p key={index}>{fqdn[index]}</p>
                                    }
                                })}
                            </>
                        }
                        </Card.Text>
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
                {
                    (visible_result) ?
                    <Card.Text>
                        {
                            (whitelistFlag || blacklistFlag || popularityFlag) ?
                            <p>El texto seleccionado contiene elementos de phishing</p> :
                            <p>¿Deseas hacer analisis por IA?</p>
                        }
                    </Card.Text> : 
                    null
                }

            </div>
            </Card.Body>
            <Card.Footer>
                <Github></Github> <a href="https://github.com/andresdlroca" target="_blank" rel="noopener noreferrer">Andresdlroca</a>
            </Card.Footer>
        </Card>
    )
}

export default InDepthAnalysis;