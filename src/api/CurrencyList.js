import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/api'


export default function fetchCurrencyList() {
    return axios.get(`${API_URL}/currency_list`)
}