import { useContext } from 'react';

// auth provider
// import Auth0Context from 'contexts/Auth0Context';
import JWTContext from 'contexts/JWTContext';

// ===========================|| AUTH HOOKS ||=========================== //

const useAuth = () => useContext(JWTContext);

export default useAuth;
