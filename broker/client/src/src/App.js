import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import { 
    useState 
} from 'react';

import { 
    NoMatchPage,
    Dashboard,
    LoginPage
} from './components/mainPages';

import {
  ApiManager
} from './utilities/apiManager'
const apiManager = new ApiManager()

function App() {

  const [hasAuthenticator, setHasAuthenticator] = useState(false);
  const [message, setMessage] = useState({content: 'Welcome', type: 'primary'});
  const [showToast, setShowToast] = useState(false);
  const [successToast, setSuccessToast] = useState(false); 

  const registerAuthenticator = async () => {
    const result = await apiManager.registerAuthenticator();
    if (result) {
      setHasAuthenticator(true);
      setMessage("Authenticator registered!")
      setSuccessToast(true)
      setShowToast(true)
    } else {
      setHasAuthenticator(false);
      setMessage("Registration failed!")
      setSuccessToast(false)
      setShowToast(true)
    }
  }

  const login = async (credentials) => {
    const result = await apiManager.loginToApplication(credentials);
    if (result) {
      const cookie = result;
      const headers = new Headers();
      headers.append('cookie', cookie);
      const url = `http://localhost:8000`
      fetch(url, {
        headers: headers
      }
      ).then(() => {window.location.href = url})
    } else {
      console.log("Auth FAIl")
    }
  }


  return (
    <>
    <BrowserRouter>
        <Routes>

            {/* --- ROOT --- */}
            <Route path='/' element = {<Dashboard showToast={showToast} setShowToast={setShowToast} successToast={successToast} hasAuthenticator={hasAuthenticator} registerAuthenticator={registerAuthenticator} message={message}/>} />

            {/* --- LOGIN PAGE --- */}
            <Route path='/login' element = {<LoginPage login={login} />}/>

            {/* --- PAGE NOT FOUND --- */}
            <Route path='*' element={<NoMatchPage />} />         
        </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
