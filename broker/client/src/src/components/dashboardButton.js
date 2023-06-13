import {
    Row,
    Col,
    Button
} from 'react-bootstrap'

import { 
    useNavigate 
} from 'react-router-dom';


/* --- customized dashboard button --- */
function DashboardButton(props) {
    const navigate = useNavigate();
    return(
        <Row>
            <Col>
                <Button size='lg' variant="light" onClick={() => navigate('/')}>Dashboard</Button>
            </Col>
        </Row>
    );
}

export { DashboardButton };