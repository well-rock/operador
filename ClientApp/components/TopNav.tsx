import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

export class TopNav extends React.Component<{}, TopNav> {
    constructor() {
        super();
    }

    loadSession() {
        if (sessionStorage.getItem('user') != null)
            return (<div className='navbar-text navbar-right'>
                <span>Signed in as {sessionStorage.getItem('user')}</span> |
                <NavLink to={'/logout'} activeClassName=''>  <span className='glyphicon glyphicon-log-out'></span> Logout</NavLink>
            </div>);

    }

    public render() {
        return <nav className='navbar fixed-top navbar-expand-md navbar-light bg-light shadow py-0'>
            <NavLink to={'/Home'} exact className='navbar-brand' activeClassName=''>
                <img className='svg-nav' src='/dist/img/ProjectQ.svg' />
            </NavLink>
            <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarCollapse' aria-controls='navbarCollapse' aria-expanded='false' aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'></span>
            </button>
            <div className='collapse navbar-collapse' id='navbarCollapse'>
                <ul className='navbar-nav mr-auto main-nav'>
                    <li className='nav-item'>
                    </li>
                    <li className='nav-item'>
                    </li>
                    <li className='nav-item'>
                    </li>
                </ul>
                {this.loadSession()}
            </div>
        </nav>;
    }   
}
