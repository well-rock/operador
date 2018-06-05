import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';

export interface LayoutProps {
    children?: React.ReactNode;
}

export class Layout extends React.Component<LayoutProps, {}> {

    loadSession() {
        if (sessionStorage.getItem('user') != null)
            return (<div className='container-fluid mt-5 pt-4'>
                <div className='row'>
                    <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
                        <div className='sidebar-sticky'>
                            <SideNav />
                        </div>
                    </nav>
                    <main className='col-md-9 ml-sm-auto col-lg-10 px-4'>
                        {this.props.children}
                    </main>
                </div>
            </div>);

        return (<div className='container-fluid mt-5 pt-4'>
            <div className='row'>
                <main className='col-md-12 px-4'>
                    {this.props.children}
                </main>
            </div>
        </div>);
    }

    public render() {
        return <div>
            <TopNav />
            {this.loadSession()}
        </div>;
    }
}
