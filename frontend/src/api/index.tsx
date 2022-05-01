import axios, { AxiosResponse } from 'axios';

const API = axios.create({
    baseURL: 'https://dai-escrow.herokuapp.com/'
})

const responseBody = (response: AxiosResponse) => response;
const requests = {
    get: (url: string) => API.get(url).then(responseBody),
    post: (url: string, body: {}) => API.post(url, body).then(responseBody),
    patch: (url: string, body: {}) => API.patch(url, body).then(responseBody),
    delete: (url: string) => API.delete(url).then(responseBody),
};

/**Contracts */
export const ContractsService = {
    fetchContracts: () => requests.get('/contracts'),
    createContract: (contract: any) => requests.post('/contracts', contract),
    updateContract: (id: string, newContract: {}) => requests.patch(`/contracts/${id}`, newContract),
    deleteContract: (id: string) => requests.delete(`/contracts/${id}`)
}
