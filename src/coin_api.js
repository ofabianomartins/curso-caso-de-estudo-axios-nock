const coinApiServer = require('./server.js')

class CoinApi {

  static getSymbols(preffix = "") {
    if( preffix === "") {
      return coinApiServer.get('/symbols')
    } else {
      return coinApiServer.get(`/symbols/${preffix}`)
    }
  }

}

module.exports = CoinApi
