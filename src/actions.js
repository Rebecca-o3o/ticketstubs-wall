import axios from './axios';
import { browserHistory } from 'react-router';


export function loadTicketstubs(userId){

    let url = '/api/getTicketstubs/' + userId;

    return axios.get(url).then((serverResponse) => {

        if (!serverResponse.data) {
            browserHistory.push('/');
        }
        else {
            return {
                type: 'LOAD_TICKET_STUBS',
                stubs: serverResponse.data
            };
        }
    });
}
