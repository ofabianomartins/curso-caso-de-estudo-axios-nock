const expect = require('chai').expect;
const nock = require('nock')

const CoinApi = require('../src/coin_api.js')

const list_symbols = require("./fixtures/list_symbols.json")

describe('CoinApi', function() {

  context('default', function() {
    before(function() {
      nock("https://rest.coinapi.io/v1")
        .get("/symbols/KRAKENFTS")
        .reply(200, list_symbols)
    })
    after(function() {
      nock.cleanAll()
    })

    it('expect list symbols', function(done) {
      CoinApi.getSymbols('KRAKENFTS').then((resp)=> {
        expect(resp.data.length).to.be.eq(1)
        expect(resp.data[0].symbol_id).to.be.match(/^KRAKENFTS/)
        done()
      }).catch(done)
    })
  })
  context('when 404', function() {
    before(function() {
      nock("https://rest.coinapi.io/v1")
        .get("/symbols/KRAKENFTS")
        .reply(404, "Não encontrado")
    })
    after(function() {
      nock.cleanAll()
    })

    it('expect list symbols', function(done) {
      CoinApi.getSymbols('KRAKENFTS').then(() => {
        expect(1).to.be.eq(2)
        done()
      }).catch((error) => {
        expect(error.response.status).to.be.eq(404)
        expect(error.response.data).to.be.eq("Não encontrado")
        done()
      })
    })
  })
})
