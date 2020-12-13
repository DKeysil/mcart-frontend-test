import axios from 'axios';

const API_URL = 'http://127.0.0.1:8080/api'


export default function fetchExchangeRateDifference(VAL_NM_RQ, date_req1, date_req2) {
    console.log('fetch query: ', VAL_NM_RQ, date_req1, date_req2)
    return axios.get(`${API_URL}/exchange_rate_difference?date_req1=${date_req1}&date_req2=${date_req2}&symb=${VAL_NM_RQ}`)
}