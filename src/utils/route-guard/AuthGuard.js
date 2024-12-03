import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// project imports
import useAuth from 'hooks/useAuth';
import { useEffect } from 'react';
import { getStorageData } from '../auth/auth';

// ===========================|| AUTH GUARD ||=========================== //

/**
 * Authentication guard for routes
 * @param {PropTypes.node} children children element/node
 */
const AuthGuard = ({ children }) => {
    const navigate = useNavigate();

    const tokenChecker = () => {
        if (getStorageData()) {
            return true;
        }
        return false;
    };
    useEffect(() => {
        if (!tokenChecker()) {
            navigate('login', { replace: true });
        }
    }, [navigate]);

    return children;
};

AuthGuard.propTypes = {
    children: PropTypes.node
};

export default AuthGuard;
