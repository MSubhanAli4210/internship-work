import axios from 'axios';
import {serverUrl1, serverUrlEmail} from '../@config/config';

let baseUrl: string=`${serverUrl1}`;

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/users`,
});


let baseUrlEmail: string =`${serverUrlEmail}`;
export const axiosInstance2 = axios.create({
    baseURL: `${baseUrlEmail}api end`,
})