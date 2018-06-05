import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Logout extends React.Component<RouteComponentProps<{}>, {}> {

    logOut() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('access_token');
        sessionStorage.removeItem('token_type');

        this.props.history.push('/');
    }

    render() {
        this.logOut();

        return <div className="lds-dual-ring"></div>;
    }
}