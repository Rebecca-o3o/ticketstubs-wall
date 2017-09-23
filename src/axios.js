import axios from 'axios';

var instance = axios.create({
    xsrfCookieName: 'wall_-t',        //read document.cookie and use it as token
    xsrfHeaderName: 'csrf-token'        //use token in header
});

export default instance;
