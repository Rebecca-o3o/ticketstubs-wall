import axios from './axios';
// import { browserHistory } from 'react-router';


export function loadTicketstubs(){

    // console.log("REDUX ACTION loadTicketstubs");

    let url = '/api/getTicketstubs/1';
    // TODO path + userId;

    return axios.get(url).then((serverResponse) => {

        // console.log(serverResponse.data);

        return {
            type: 'LOAD_TICKET_STUBS',
            stubs: serverResponse.data
        };
    });
}
