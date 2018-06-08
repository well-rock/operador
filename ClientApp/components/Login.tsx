import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink, withRouter } from 'react-router-dom';
import 'isomorphic-fetch';

interface User {
    username: string;
    password: string;
    isLoading: boolean;
}

export class Login extends React.Component<RouteComponentProps<{}>, User> {
    constructor() {
        super();
        this.state = { username: '', password: '', isLoading: false };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(event: any) {
        this.setState({ username: event.target.value });
    }

    handlePasswordChange(event: any) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event: any) {
        this.attemptLogin();
        //alert('A name was submitted: ' + this.state.username + ' / ' + this.state.password);
        event.preventDefault();
    }

    attemptLogin() {

        this.setState({ isLoading: true });

        var data = 'grant_type=password&username=' + this.state.username + '&password=' + this.state.password;

        fetch('https://projectq-api.azurewebsites.net/Token', {
            method: 'POST',
            body: data
        }).then(function (res) {
            if (res.status == 400)
                alert('Username or password is incorrect!');
            else
                return res.json();
        })
            .then(data => {
                //alert(JSON.stringify(data));
                sessionStorage.setItem('user', data.userName);
                sessionStorage.setItem('access_token', data.access_token);
                sessionStorage.setItem('token_type', data.token_type);
                sessionStorage.setItem('valor', '0');
                console.log('Welcome ' + sessionStorage.getItem('user'));

                this.props.history.push('/Home');
                //location.href = '/';
                //alert(sessionStorage.getItem('user') + ' / ' + sessionStorage.getItem('access_token') + ' / ' + sessionStorage.getItem('token_type'));
            });
        this.setState({ isLoading: false });
    }

    checkLoad() {
        const { isLoading } = this.state;

        if (isLoading)
            return <span className='lds-dual-ring-button'></span>;

        return 'Login';
    }

    render() {

        return (<form className='form-signin' onSubmit={this.handleSubmit}>
            <div className='text-center mb-4'>
                <img className='mb-4' src='/dist/img/ProjectQ.svg' alt='' width='300' />
                <h1 className='h3 mb-3 font-weight-normal'>Authentication Required</h1>
            </div>
            <div className='form-label-group'>
                <input type='text' id='inputUsername' value={this.state.username} onChange={this.handleUsernameChange} className='form-control' placeholder='Username' required autoFocus/>
                <label htmlFor='inputUsername'>Username</label>
            </div>
            <div className='form-label-group'>
                <input type='password' id='inputPassword' value={this.state.password} onChange={this.handlePasswordChange} className='form-control' placeholder='Password' required />
                <label htmlFor='inputPassword'>Password</label>
            </div>
            <div className='checkbox mb-3'>
                <label>
                    <input type='checkbox' value='remember-me' /> Remember me
            </label>
            </div>
            <button className='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
            <p className='mt-5 mb-3 text-muted text-center'>© ProjectQ - 2018</p>
        </form>);


        //return (
        //    <form onSubmit={this.handleSubmit}>
        //        <h1>Please Log In</h1>
        //        <hr />
        //        <div className='row'>
        //            <div className='col-md-3 col-md-offset-4'>
        //                <div className='form-group'>
        //                    <label>Username</label>
        //                    <input type='text' className='form-control' value={this.state.username} onChange={this.handleUsernameChange} required autoFocus />
        //                </div>
        //                <div className='form-group'>
        //                    <label>Password</label>
        //                    <input type='password' className='form-control' value={this.state.password} onChange={this.handlePasswordChange} required />
        //                </div>
        //                <div className='col-sm-6'>
        //                    <button type='submit' className='btn btn-block btn-primary'>{this.checkLoad()}</button>
        //                </div>
        //                <div className='col-sm-6'>
        //                    <NavLink to={'/'} className='btn btn-default btn-block' activeClassName=''>Cancel</NavLink>
        //                </div>
        //            </div>
        //        </div>
        //    </form>
        //);
    }
}