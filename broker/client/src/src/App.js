import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

/* --------- IMPORT REACT ROUTE COMPONENT --------- */
import {
    BrowserRouter,
    Navigate,
    Routes,
    Route
} from 'react-router-dom';

/* --------- IMPORT REACT COMPONENT --------- */
import { 
    useState 
} from 'react';

/* --------- IMPORTING CUSTOMIZED COMPONENT --------- */
import { 
    HomePage,
    LoginPage,
    Registration,
    NoMatchPage
} from './components/mainPages';

function App() {

  const [hasAuthenticator, setHasAuthenticator] = useState(false);
  const [message, setMessage] = useState({content: 'Welcome', type: 'primary'});

  const registerAuthenticator = async () => {
    console.log("--- START REGISTRATION OF AUTHENTICATOR ---")
    setHasAuthenticator(true)
  }


  return (
    <>
    <BrowserRouter>
        <Routes>

            {/* --- ROOT --- */}
            <Route path='/' element = {<LoginPage login={registerAuthenticator} message={message}/>} />

            {/* --- LOGIN --- */}
            <Route path='/dashboard' element = {
                hasAuthenticator ? <HomePage loggedIn={hasAuthenticator} setMessage={setMessage} message={message}/> : <Navigate replace to='/' />
            } />

            {/* --- LOGIN --- */}
            <Route path='/registration' element = {<Registration />} />

            {/* --- PAGE NOT FOUND --- */}
            <Route path='*' element={<NoMatchPage loggedIn={hasAuthenticator}/>} />         
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;