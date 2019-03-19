import axios from 'axios';

export default {
    register: (userData) => {
        return axios.post('/auth/post/signup',userData);
    },
    login: (userData) => {
        return axios.post('/auth/post/user',userData);
    },
    logout: () => {
        return axios.post('/auth/post/logout');
    },
    getUser: () => {
        return axios.get('/auth/get/user');
    },
    getAllUsers: () => {
        return axios.get('/admin/users');
    },
    sendToken: (tokenData) => {
        return axios.post('admin/send_token',tokenData);
    }
}