import axios from 'axios';
import { baseUrl } from './config';

export const SignUpRequest = async (userData) => {
    try {
        await axios.post(`${baseUrl}/user`, userData);
    } catch (error) {
        console.log('Data Save fail');
    }
};
