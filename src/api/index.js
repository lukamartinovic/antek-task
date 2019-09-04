import axios from 'axios';

const routes = {
    getAll: '/get',
    getId: '/get/',
    addEntry: '/post',
    deleteEntry: '/delete/',
    editEntry: '/put'
};

const host = 'localhost:3000';

export const requests = {
    getAll(callback, errorCallback) {
        axios.get(host + routes.getAll)
            .then(res => callback(res))
            .catch(err => callback(err))
    }
}
