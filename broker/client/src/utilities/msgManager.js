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
                This is an example of Internal Legacy Application.
            </Row>
            <hr />
            <Row className="justify-content-md-center">
                Click the button to check whether you are authenticated or not.
            </Row>
        </Alert>      
    );
}

/**
 * Greeting message for the login page
 * @param {Object} props 
 * @returns Render this component
 */
function GreetingsOnLogin(props) {
    if (props.message.type === 'danger') {
        return (
            <Alert variant="danger">
                <Alert.Heading>
                    <Container fluid>
                        <Row className="justify-content-md-center">
                            {props.message.content}
                        </Row>
                    </Container>
                </Alert.Heading>
                <hr />
                <Row className="justify-content-md-center">
                    Please, fill the form to login
                </Row>
            </Alert>
        );
    }
    return (
        <Alert variant="primary">
            <Alert.Heading>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        Welcome
                    </Row>
                </Container>
            </Alert.Heading>
            <hr />
            <Row className="justify-content-md-center">
                Please, fill the form to login
            </Row>
        </Alert>
    );
}

/**
 * Greeting message for the study plan page
 * @param {Object} props 
 * @returns Render this component
 */
function GreetingsNewStudyPlan(props) {
    return (
        <Alert variant="success">
            <Alert.Heading>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        {props.hasStudyPlan ?
                            'Here you can edit your study plan' :
                            'Here you can create your study plan'
                        }
                    </Row>
                </Container>
            </Alert.Heading>
            <hr />
            <Row className="justify-content-md-center">
                {props.hasStudyPlan ?
                    'When you are done, hit the save button to confirm changes' :
                    'Please, choose an option'
                }
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

export { Greetings, GreetingsOnLogin, GreetingsNewStudyPlan, GreetingsNoMatch };