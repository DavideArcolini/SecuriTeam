/* --------- IMPORTING REACT BOOTSTRAP COMPONENTS --------- */
import { 
    Alert, 
    Container, 
    Row 
} from "react-bootstrap";

/**
 * Greeting message for the home page
 * @param {Object} props 
 * @returns Render this component
 */
function Greetings(props) {
    return (
        <Alert variant="primary">
            <Alert.Heading>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        {props.message.content}
                    </Row>
                </Container>
            </Alert.Heading>
            <Row className="justify-content-md-center">
                This is the dashboard of the SecuriTeam Broker application.
            </Row>
            <hr />
            <Row className="justify-content-md-center">
                Click the button to register a new authenticator.
            </Row>
        </Alert>      
    );
}


/**
 * Greeting message for the no-match page
 * @param {Object} props 
 * @returns Render this component
 */
function GreetingsNoMatch() {
    return (<>
        <Alert variant="danger">
            <Alert.Heading>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        404: Page Not Found
                    </Row>
                </Container>
                </Alert.Heading>
                <hr />
                <Row className="justify-content-md-center">
                    This is not the route you were looking for...
                </Row>
        </Alert>
    </>);
}

export { Greetings, GreetingsNoMatch };