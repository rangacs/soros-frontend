import React, { lazy } from 'react';
import Loadable from 'ui-component/Loadable';

// project imports
import MinimalLayout from 'layout/MinimalLayout';
import NavMotion from 'layout/NavMotion';

// login option 1 routing
const AuthLogin1 = Loadable(lazy(() => import('views/authentication/authentication1/Login1')));
const AuthForgotPassword1 = Loadable(lazy(() => import('views/authentication/authentication1/ForgotPassword1')));
const AuthCheckMail1 = Loadable(lazy(() => import('views/authentication/authentication1/CheckMail1')));
const AuthResetPassword1 = Loadable(lazy(() => import('views/authentication/authentication1/ResetPassword1')));
const ResetPassword = Loadable(lazy(() => import('views/authentication/authentication1/forms/ResetPassword')));
const AuthCodeVerification1 = Loadable(lazy(() => import('views/authentication/authentication1/CodeVerification1')));

// ===========================|| AUTHENTICATION ROUTING ||=========================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/login',
            element: (
                <NavMotion>
                    <AuthLogin1 />
                </NavMotion>
            )
        },
        {
            path: '/forgot-password',
            element: <AuthForgotPassword1 />
        },
        {
            path: '/check-mail/check-mail1',
            element: <AuthCheckMail1 />
        },
        /* {
            path: '/reset-password/reset-password1',
            element: <ResetPassword />
        }, */
        {
            path: '/code-verification/code-verification1',
            element: <AuthCodeVerification1 />
        }
    ]
};

export default AuthenticationRoutes;
