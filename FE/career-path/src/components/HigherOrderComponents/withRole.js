import React from 'react';
import { Navigate } from 'react-router-dom';

const withRole = (WrappedComponent, allowedRoles) => {
    return class WithRole extends React.Component {
        render() {
            const userRole = sessionStorage.getItem('userRole');

            if (allowedRoles.includes(userRole)) {
                return <WrappedComponent {...this.props} />;
            } else {
                return <Navigate to="/" />;
            }
        }
    };
};

export default withRole;