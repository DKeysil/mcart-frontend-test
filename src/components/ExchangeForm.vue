<template>
<div v-if="CurrencyList">
  <form @submit.prevent="onSubmit" id="exchange-form">
        <label for="VAL_NM_RQ-input">Выберите валюту:</label>
        <select name="VAL_NM_RQ-input" id="VAL_NM_RQ-input" form="exchange-form" v-model="VAL_NM_RQ">
            <option v-for="currency in CurrencyList" :key=currency[0] :value=currency[0]>{{currency[0]}} - {{currency[1]}}</option>
        </select>

        <label for="date_req1-input">
            Начальная дата
        </label>

        <input
            id="date_req1-input"
            type="date"
            v-model="date_req1"
        />
        <label for="date_req2-input">
            Конечная дата
        </label>

        <input
            id="date_req2-input"
            type="date"
            v-model="date_req2"
        />

        <button type="submit">Получить</button>
    </form>
    <ExchangeRateResult v-if="result" :title="title" :difference="difference" :first_exchange_rate="first_exchange_rate" :second_exchange_rate="second_exchange_rate"/>
    <ExchangeRateError v-if="error" :error="error" />
</div>
</template>

<script>
import fetchExchangeRateDifference from '../api/ExchangeRateDIfference.js'
import ExchangeRateResult from './ExchangeRateResult.vue'
import fetchCurrencyList from '../api/CurrencyList.js'
import ExchangeRateError from './ExchangeRateError.vue'

export default {
    components: {
    ExchangeRateResult,
    ExchangeRateError
    },
    methods: {
        onSubmit() {
            if (this.VAL_NM_RQ === "" || this.date_req1 === "" || this.date_req2 === "") {
                return;
            }
            let date_1 = new Date(this.date_req1)
            this.date_req1 = date_1.getFullYear() + '-' + ("0" + (date_1.getMonth() + 1)).slice(-2) + '-' + ("0" + date_1.getDate()).slice(-2)
            let date_2 = new Date(this.date_req2)
            this.date_req2 = date_2.getFullYear() + '-' + ("0" + (date_2.getMonth() + 1)).slice(-2) + '-' + ("0" + date_2.getDate()).slice(-2)
            
            fetchExchangeRateDifference(this.VAL_NM_RQ, this.date_req1, this.date_req2).then((response) => {
                console.log(response.data)
                this.title = response.data['title']
                this.first_exchange_rate = response.data['first_exchange_rate']
                this.second_exchange_rate = response.data['second_exchange_rate']
                this.difference = response.data['difference']
                this.result = true
                this.error = null
            }).catch(error => {
                this.result = false
                this.title = null
                this.first_exchange_rate = null
                this.second_exchange_rate = null
                this.difference = null
                this.error = error.response
                console.log(this.error)     
               })
        }
    },
    data () {
        return {
            VAL_NM_RQ: null,
            date_req1: null,
            date_req2: null,
            title: null,
            first_exchange_rate: null,
            second_exchange_rate: null,
            difference: null,
            result: false,
            CurrencyList: null,
            error: null
        };
    },
    mounted () {
    fetchCurrencyList().then((response) => {
        this.CurrencyList = response.data;
      })
  }

}
</script>

<style>
table {
    width: 100%
}
</style>