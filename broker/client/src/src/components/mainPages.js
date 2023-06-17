import { 
    Button, 
    Container, 
    Row,
    Col
} from 'react-bootstrap';

import { 
    useNavigate
} from 'react-router-dom';

import { 
    NavigationBar 
} from './navigationBar';

import { 
    Greetings, 
    GreetingsNoMatch
} from '../utilities/msgManager';

import {
    LoginForm
} from './loginForm'


function Dashboard(props) {

    const navigate = useNavigate();

    return (
        <div>

            {/* NAVIGATION BAR */}
            <NavigationBar />

            {/* HOME PAGE MESSAGE */}
            <Greetings message={props.message} hasAuthenticator={props.hasAuthenticator}/>

            {/* BODY OF THE HOME PAGE */}
            <Container fluid>
                <div>
                    <Row className="justify-content-md-center">
                        <Col md="4" className='text-center'>
                            <Row className="justify-content-md-center mb-4">
                                <Button variant="primary" size="lg" onClick={props.registerAuthenticator}>
                                    Register new authenticator
                                </Button>
                            </Row>

                            <Row className="justify-content-md-center">
                                {props.hasAuthenticator && 
                                <Button variant="success" size="lg" onClick={() => {navigate('/login')}}>
                                    Login to application
                                </Button>
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>


            {/* TOAST */}
            <div 
                className="position-fixed top-50 start-50 translate-middle"
                style={{ zIndex: 11, transform: 'translate(-50%, -50%)' }}
            >
            {props.showToast && (
                props.successToast ? (
                    <div className="toast show text-white bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="toast-header">
                    <strong className="me-auto">SecuriTeam</strong>
                    <small>Now</small>
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="toast"
                        aria-label="Close"
                        onClick={() => props.setShowToast(false)} // Hide the toast when the close button is clicked
                    ></button>
                    </div>
                    <div className="toast-body">{props.message}</div>
                </div>) : (<div className="toast show text-white bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <strong className="me-auto">SecuriTeam</strong>
                    <small>Now</small>
                    <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={() => props.setShowToast(false)} // Hide the toast when the close button is clicked
                    ></button>
                </div>
                <div className="toast-body">{props.message}</div>
                </div>)
            )}
            </div>
        </div>
    );
}

/**

/**
 * Page when the user is reaching a non-defined route.
 * @param {Object} props 
 * @returns Render this component
 */
function NoMatchPage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsNoMatch />
            </div>    

            <div className='justify-content-center' md="10">
                <center>
                    <img src={require('../logo.svg')} alt="loading..." width="1000" height='auto' />
                </center>
            </div>
        </div>
    );
}

function LoginPage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div style={{ marginBottom: '40px' }}>
                <NavigationBar />
            </div> 

            

            {/* LOGIN FORM */}
            <div>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <LoginForm login={props.login} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export { NoMatchPage, Dashboard, LoginPage };