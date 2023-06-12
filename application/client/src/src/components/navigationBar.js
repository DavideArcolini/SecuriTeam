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
        <Navbar expand="lg" bg="primary" variant="dark">
            {/* LOGO AND NAVBAR BRAND */}
            <Container>
                <Navbar.Brand action={1} style={{cursor:'pointer'}} onClick={() => {navigate('/');}}>
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