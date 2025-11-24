import axios from 'axios';
import {serverUrl, serverUrl1} from '../@config/config';

let baseUrl: string=`${serverUrl1}`;

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/users`,
});

export const axiosInstanceOfServer = axios.create({
    baseURL: `${serverUrl}`,
}) 