import axios from 'axios';
import {serverUrl} from '../@config/config';

let baseUrl: string=`${serverUrl}`;

export const axiosInstance = axios.create({
    baseURL: `${baseUrl}/users`,
});