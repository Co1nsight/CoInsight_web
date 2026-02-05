import axios from 'axios';

const BACKEND = import.meta.env.VITE_BACKEND_URL;

export const instance = axios.create({
    baseURL: BACKEND,
    headers: {
        'Content-Type' : 'application/json',
    }
})