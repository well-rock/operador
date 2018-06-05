import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {

    private static loadSession() {
        if (sessionStorage.getItem('user') == null)
            return 'Hello Stranger!';

        return ('Seja Bem-Vindo ' + sessionStorage.getItem('user')+'!');
    }

    public render() {
        let contents = Home.loadSession();

        return <div>
            <h1>{contents}</h1>
            
            <ul>
                <br></br>
                <br></br>
                <br></br>
            </ul>
            <h4>Laboratório de Software e Projetos</h4>
            <p>
                Clique ao lado em sua fila, para que possa verificar a senha atual, e chamar o próximo número.
                
            </p>
        </div>;
    }
}
