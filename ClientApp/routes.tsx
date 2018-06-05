import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import { Login } from './components/Login';
import { Logout } from './components/Logout';
import { Queue } from './components/Queue';


export const routes = <Layout>
    <Route exact path='/' component={Login} />
    <Route path='/counter' component={Counter} />
    <Route path='/fetchdata' component={FetchData} />
    <Route path='/Home' component={Home} />
    <Route path='/logout' component={Logout} />
    <Route path='/queue' component={Queue} />
</Layout>;
