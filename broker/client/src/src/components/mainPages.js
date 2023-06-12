/* --------- IMPORT REACT BOOTSTRAP COMPONENTS --------- */
import { 
    Button, 
    Container, 
    Row,
    Col
} from 'react-bootstrap';

/* --------- IMPORT CUSTOMIZED COMPONENTS --------- */
import { 
    NavigationBar 
} from './navigationBar';

import { 
    Greetings, 
    GreetingsOnLogin,
    GreetingsNoMatch
} from '../utilities/msgManager';

/* --------- IMPORT REACT ROUTER COMPONENTS --------- */
import { 
    useNavigate
} from 'react-router-dom';

const { browserSupportsWebAuthn, startRegistration, startAuthentication } = require('@simplewebauthn/browser');

/**
 * Home Page when the user is not editing the study plan or is not logged in
 * @param {Object} props 
 * @returns Render this component
 */
function HomePage(props) {

    return (
        <div>

            {/* NAVIGATION BAR */}
            <NavigationBar loggedIn={props.loggedIn}/>

            {/* HOME PAGE MESSAGE */}
            <Greetings message={props.message} loggedIn={props.loggedIn}/>

            {/* BODY OF THE HOME PAGE */}
            <Container fluid>
                <div>
                    <Row className="justify-content-md-center">
                        <Col md="4" className='text-center'>

                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
}

/**
 * Login page where the login form is rendered.
 * @param {Object} props 
 * @returns Render this component
 */
function LoginPage(props) {
    const navigate = useNavigate();
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsOnLogin message={props.message}/>
            </div>  

            {/* LOGIN FORM */}
            <div>
                <Row className="justify-content-md-center">
                    <Col md="4" className='text-center'>
                        <Button variant="primary" size='lg' onClick={() => navigate('/registration')}>Register Authenticator</Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

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
                <NavigationBar loggedIn={props.loggedIn}/>
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


const stopSubmit = (event) => {
    event.preventDefault();
};

const handleRegistration = async () => {
    const resp = await fetch('http://localhost:3001/register/preregister');

    let attResp;
    try {
        const opts = await resp.json();
        console.log(opts)
        attResp = await startRegistration(opts);
    } catch (error) {
        if (error.name === 'InvalidStateError') {
            console.log("ERROR")
        } else {
            console.log("ERROR")
        }
        throw error;
    }

    console.log(attResp);
    const verificationResp = await fetch('http://localhost:3001/register/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attResp),
    });

    console.log(verificationResp);
    const verificationJSON = await verificationResp.json();

    console.log(verificationJSON);
    if (verificationJSON && verificationJSON.verified) {
        console.log("REGISTRATION OK")
    } else {
        console.log("REGISTRATION FAILED")
    }
}


const handleVerification = async () => {
    const resp = await fetch('http://localhost:8000/access/preauthenticate');

    let asseResp;
    try {
        const opts = await resp.json();
        console.log(opts)
        asseResp = await startAuthentication(opts);
    } catch (error) {
        console.log(error)
    }

    const verificationResp = await fetch('http://localhost:8000/access/authentication', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(asseResp),
    });

    const verificationJSON = await verificationResp.json();
    if (verificationJSON && verificationJSON.verified) {
        console.log("VERIFICATION OK")
    } else {
        console.log("VERIFICATION FAILED")
    }
}




function Registration(props) {  
    return (
        <div className="container">
          <h1>SecuriTeam Dashboard</h1>
    
          <div className="controls">
            <section id="registration">
              <button onClick={() => handleRegistration()}>
                <strong>🚪 Register Authenticator</strong>
            </button>
            <p id="regSuccess" className="success"></p>
            <p id="regError" className="error"></p>
            </section>
          </div>
    
          <p className="systemError"></p>
        </div>
    )
    
  }





export { HomePage, LoginPage, Registration, NoMatchPage };