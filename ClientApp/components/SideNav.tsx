import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface QueueStatus {
    queues: Queue[];
    loading: boolean;
}

interface Queue {
    Id: number;
    QueueName: string;
}

export class SideNav extends React.PureComponent<{}, QueueStatus> {
    constructor() {
        super();

        this.state = ({ queues: [], loading: true });
    }

    componentDidMount() {
        this.setState({ loading: true });

        const requestHeader = new Headers();
        requestHeader.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));

        console.log('Fetching data from API')
        fetch('https://projectq-api.azurewebsites.net/api/Queue/Identities/', {
            headers: requestHeader,
            method: 'GET'
        }).then(function (response) {
            if (response.status != 200) {
                console.log('Fetch failed!');
                throw new Error(response.statusText);
            }
            else {
                return response;
            }
        }).then(response => response.json() as Promise<Queue[]>)
            .then(data => {
                this.setState({ queues: data, loading: false })
                console.log('Fetched data from API')
            }).catch(err => {
                console.log(err);
            });
    }

    public render() {
        const { queues, loading } = this.state;

        if (loading) {
            return <ul className='nav nav-pills flex-column '>
                <li>
                    <div className="lds-dual-ring centered"></div>
                </li>
            </ul>;
        }

        return <ul className='nav flex-column '>
            {queues.map(queue =>
                <li key={queue.Id} >
                    <NavLink to={'/queue/' + queue.Id} activeClassName='active' className='nav-link'>
                        {queue.QueueName}
                </NavLink>
                </li>
                )}
        </ul>;
    }
}
