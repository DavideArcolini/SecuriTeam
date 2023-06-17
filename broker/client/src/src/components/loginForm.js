import { Button }       from 'react-bootstrap';
import { Form }         from 'react-bootstrap';
import { FloatingLabel }from 'react-bootstrap';
import { useState }     from "react";
import { useNavigate } from 'react-router-dom';

function LoginForm (props) {

    /* --- STATES --- */
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    /**
     * Handle the submit request after fields validations
     * --------------------------------------------------
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        props.login({username, password});
    }

    /* --- RENDER LOGIN FORM --- */
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId='username'>
                <FloatingLabel controlId="floatingUsername" label="username">
                    <Form.Control placeholder="username" type='email' value={username} onChange={ev => setUsername(ev.target.value)} required={true} />
                </FloatingLabel>
            </Form.Group>
            {' '}
            <Form.Group controlId='password'>
                <FloatingLabel controlId="floatingPassword" label="password">
                    <Form.Control placeholder='password' type='password' value={password} onChange={ev => setPassword(ev.target.value)} required={true} minLength={8}/>
                </FloatingLabel>
            </Form.Group>
            <hr />
            <Button type="submit">Login</Button>
      </Form>
    );
}

export { LoginForm };