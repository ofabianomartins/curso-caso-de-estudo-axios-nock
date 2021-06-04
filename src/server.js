const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://rest.coinapi.io/v1/',
  timeout: 1000,
  headers: {
   'X-CoinAPI-Key': '6C072847-7343-42DD-8682-E7E604FE942A'
  }
});

module.exports = instance
