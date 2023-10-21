import './dashboard.css';
import { useContext } from 'react';
import { AuthUserContext, AuthUserDispatchContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import Button from '../button/Button';

const Dashboard = () => {
    const username = useContext(AuthUserContext);
    const dispatch = useContext(AuthUserDispatchContext);

    const onClick = () => {
        dispatch({action: 'logout'}); 
    }
    return (
        <section className="dashboard-container">
            {!username && 
                <Navigate to="/login" />
            }
            <h1>Hello, {username}</h1>
            <Button 
                tabIndex="4"
                type="button"
                text="Log Out"
                onClick={onClick}
            />
        </section>
    )
}

export default Dashboard;