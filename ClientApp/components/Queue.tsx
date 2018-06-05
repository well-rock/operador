import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import 'isomorphic-fetch';


interface QueueStatus {
    queues: Queue[];
    loading: boolean;
    queueIdentity: QueueIdentity;
    queueItem: QueueItem;
    errorMessage: string;
    fetchFailed: boolean;
}

interface QueueIdentity {
    Id: number;
    QueueName: string;
    QueueCompanyName: string;
    QueueSize: number;
}

interface QueueItem {
    Id: number;
    Ticket: string;
    Position: number;
    QueueIdentity: string;
    QueueCompany: string;
}

export class Queue extends React.Component<RouteComponentProps<{}>, QueueStatus>{
    constructor() {
        super();
        this.state = { queueIdentity: {} as QueueIdentity,queueItem: {} as QueueItem,queues: [], loading: true, errorMessage: "", fetchFailed: false };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event: any) {
        this.chamaFila();
        event.preventDefault();
    }
    shouldComponentUpdate() {
        return true;
    }

    componentDidMount() {
        this.setState({ loading: true });

        var substringId = location.href.substr(location.href.lastIndexOf('/') + 1);
        const requestHeader = new Headers();
        requestHeader.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));

        console.log('Fetching data from API')
        fetch('https://projectq-api.azurewebsites.net/api/Queue/Identity/' + substringId, {
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
        }).then(response => response.json() as Promise<QueueIdentity>)
            .then(data => {
                this.setState({ queueIdentity: data, loading: false })
                console.log('Fetched data from API')
            }).catch(err => {
                console.log(err);
                this.setState({ fetchFailed: true, errorMessage: err.message, loading: false });
            });
    }

    chamaFila() {

        this.setState({ loading: true });

        
        const requestHeader = new Headers();
        requestHeader.append('Authorization', 'Bearer ' + sessionStorage.getItem('access_token'));

        console.log('Fetching data from API')
        fetch('https://projectq-api.azurewebsites.net/api/Queue/Item/40', {
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
        }).then(response => response.json() as Promise<QueueItem>)
            .then(data => {
                this.setState({ queueItem: data, loading: false })
                console.log('Fetched data from API')
            }).catch(err => {
                console.log(err);
            });
    }

    render() {
        const { queueIdentity, queueItem, loading, errorMessage, fetchFailed } = this.state;

        if (loading) {
            return <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-2 align-self-center'>
                        <div className="lds-dual-ring centered"></div>
                    </div>
                </div >
            </div>;
        }

        if (fetchFailed) {
            return <h3 className='text-center'>{errorMessage}</h3>;
        }

        return (<form  onSubmit={this.handleSubmit}>
            <div className="card mb-3">
        
        <div className="table-responsive">
          <table className="table" width="100%">
            <thead>
              <tr>
                <th><p>Fila</p></th>
              </tr>
              <tr>
                <th>Próximo</th>
                <th></th>
                <th></th>
                <th>Senha Atual</th>
                <th></th>
                <th>Chamar Novamente</th>
              </tr>
            </thead>
              <tr>
                <td><button type='submit' className="btn btn-default btn-lg">
                      <span id="prox" className="glyphicon glyphicon-play" aria-hidden="true"></span>
                    </button></td>
                <td></td>
                <td></td>
                <td><p>{queueItem.Ticket}</p></td>
                <td></td>
                <td><button type="button" className="btn btn-default btn-lg">
                      <span id="recall" className="glyphicon glyphicon-repeat" aria-hidden="true"></span>
                    </button></td>
              </tr>
              <tr>
                <td></td>
                <td><b>{queueIdentity.QueueSize}</b> Pessoas na Fila</td>
                <td></td>
                <td></td>
                <td><b></b> Pessoas Atendidas</td>
                <td></td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </table>
        </div>
      
    
    </div>
    </form>
        )}
}