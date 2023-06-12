/* --------- IMPORTING REACT BOOTSTRAP COMPONENTS --------- */
import { 
    Navbar,
    Container,
    Nav
} from "react-bootstrap";

/* --------- IMPORTING REACT ROUTER COMPONENTS --------- */
import { 
    useNavigate 
} from "react-router-dom";

/* --------- IMPORTING CUSTOMIZED COMPONENT --------- */
import { 
    LogoutButton,
    LoginButton
} from './authenticationPages';

/**
 * Navigation bar holding the login/logout buttons.
 * @param {Object} props 
 * @returns Render this component
 */
function NavigationBar(props) {
    const navigate = useNavigate();
    return ( 
        <Navbar expand="lg" bg="secondary" variant="dark">
            {/* LOGO AND NAVBAR BRAND */}
            <Container>
                <Navbar.Brand action={1} style={{cursor:'pointer'}} onClick={() => {navigate('/');}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-calendar-date" viewBox="0 0 16 16"><path d="M6.445 11.688V6.354h-.633A12.6 12.6 0 0 0 4.5 7.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"/><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z"/></svg>{' '}
                    Internal Legacy Application
                </Navbar.Brand>
            </Container>

            {/* LOGIN/LOGOUT BUTTON */}
            {!props.loggedIn && <Container>
                <Nav className="ms-auto">
                    <Nav.Link>
                        <LoginButton />
                    </Nav.Link>
                </Nav>
            </Container>}
            {props.loggedIn && <Container>
                <Nav className="ms-auto">
                    <Nav.Link>
                        <LogoutButton logout={props.logout} />
                    </Nav.Link>
                </Nav>
            </Container>}
        </Navbar>
    );
}


/* EXPORTING NAVBAR */
export { NavigationBar };