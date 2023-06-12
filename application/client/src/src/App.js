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
    useEffect, 
    useState 
} from 'react';

/* --------- IMPORTING CUSTOMIZED COMPONENT --------- */
import { 
    HomePage,
    LoginPage,
    NoMatchPage
} from './components/mainPages';

/* --------- IMPORTING API COMPONENT --------- */
import { 
  apiManager 
} from "./utilities/apiManager";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState({content: 'Welcome', type: 'primary'});

  const frontAPI = new apiManager();

  const handleLogin = async (credentials) => {
    try {

      console.log(credentials)
        const employee = await frontAPI.login(credentials.username, credentials.password);
        console.log(employee);
        setLoggedIn(true);
        setMessage({
            content: `Welcome, Employee`,
            type: 'success'
        });
    } catch (error) {
        console.log(error);
        setMessage({
            content: 'Wrong username or password',
            type: 'danger'
        });
    }
  }

  const handleLogout = async () => {
    try {
        await frontAPI.logout();
        setLoggedIn(false);
        setMessage({content: 'Welcome'});
    } catch (error) {
        console.log(error);
        alert(error);
    }
  }

  const handleTest = async () => {
    try {
        const resp = await frontAPI.test();
    } catch (error) {
        console.log(error);
        alert(error);
    }
  }

  const checkAuth = async () => {
    try {

    } catch (error) {
        /**
         * DO NOTHING
         * ----------
         * student is simply not logged in, no problem
         */
    }
  }

  useEffect(() => {
    checkAuth();   
  }, []);


  return (
    <>
    <BrowserRouter>
        <Routes>

            {/* --- ROOT --- */}
            <Route path='/' element = {<HomePage loggedIn={loggedIn} message={message} logout={handleLogout} test={handleTest}/>} />

            {/* --- LOGIN --- */}
            <Route path='/login' element = {
                loggedIn ? <Navigate replace to='/' /> : <LoginPage login={handleLogin} message={message}/>
            } />

            {/* --- PAGE NOT FOUND --- */}
            <Route path='*' element={<NoMatchPage loggedIn={loggedIn} logout={handleLogout}/>} />         
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
