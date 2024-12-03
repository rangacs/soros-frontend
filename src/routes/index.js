import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

// project imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import SorosRoute from './SorosRoute';
// ===========================|| ROUTING RENDER ||=========================== //

export default function ThemeRoutes() {
    return useRoutes([
        LoginRoutes,
        MainRoutes,
        AuthenticationRoutes,
        SorosRoute,
        { path: '*', element: <Navigate exact path="/home/default" to="/analysis/dash" /> }
    ]);
}
