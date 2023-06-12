/* --------- IMPORT REACT BOOTSTRAP COMPONENTS --------- */
import { 
    Button, 
    Container, 
    Row,
    Col
} from 'react-bootstrap';

/* --------- IMPORT CUSTOMIZED COMPONENTS --------- */
import { 
    LoginForm 
} from './authenticationPages';

import {
    useState
} from 'react';

import { 
    NavigationBar 
} from './navigationBar';

import { 
    Greetings, 
    GreetingsOnLogin,
    GreetingsNoMatch
} from '../utilities/msgManager';




/**
 * Home Page when the user is not editing the study plan or is not logged in
 * @param {Object} props 
 * @returns Render this component
 */
function HomePage(props) {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState(false); 
    const [success, setSuccess] = useState(false); 
  
    const handleTestClick = async () => {
        if (props.loggedIn) {
            setMessage("YES! You are currently logged in the application!")
            setSuccess(true)
        } else {
          setMessage("NO! You need to perform login first.")
          setSuccess(false)
        }
        setShowToast(true)
    };
  
    return (
      <div>
        {/* NAVIGATION BAR */}
        <NavigationBar loggedIn={props.loggedIn} logout={props.logout} />
        <Greetings message={props.message} loggedIn={props.loggedIn} />
  
        {/* BODY OF THE HOME PAGE */}
        <Container fluid>
          <div>
            <Row className="justify-content-md-center">
              <Col md="4" className="text-center">
                <Button variant="primary" size="lg" id="liveToastBtn" onClick={handleTestClick}>
                  Test
                </Button>
              </Col>
            </Row>
          </div>
        </Container>
  
        {/* TOAST */}
        <div 
            className="position-fixed top-50 start-50 translate-middle"
            style={{ zIndex: 11, transform: 'translate(-50%, -50%)' }}
        >
          {showToast && (
            success ? (
                <div className="toast show text-white bg-success" role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                  <strong className="me-auto">SecuriTeam</strong>
                  <small>Now</small>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                    onClick={() => setShowToast(false)} // Hide the toast when the close button is clicked
                  ></button>
                </div>
                <div className="toast-body">{message}</div>
              </div>) : (<div className="toast show text-white bg-danger" role="alert" aria-live="assertive" aria-atomic="true">
              <div className="toast-header">
                <strong className="me-auto">SecuriTeam</strong>
                <small>Now</small>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                  onClick={() => setShowToast(false)} // Hide the toast when the close button is clicked
                ></button>
              </div>
              <div className="toast-body">{message}</div>
            </div>)
          )}
        </div>
      </div>
    );
  }

/**
 * Login page where the login form is rendered.
 * @param {Object} props 
 * @returns Render this component
 */
function LoginPage(props) {
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
                        <LoginForm login={props.login} />
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
                <NavigationBar loggedIn={props.loggedIn} logout={props.logout} />
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

export { HomePage, LoginPage, NoMatchPage };