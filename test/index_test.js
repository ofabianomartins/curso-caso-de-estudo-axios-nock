const { expect } = require('chai')

const nock = require('nock')

const axios = require('axios')

const soma = require('../src/index')

describe("index", function() {
  context("math works", function() {
    context("and arithmetic works", function() {
      it('expect that one plus one equal two', function() {
        expect(1 + 1).to.be.eq(2)
      })

      it('expect that one plus one not equal seven', function() {
        expect(1 + 1).to.not.be.eq(7)
      })
    })

    context("and set theory works", function() {
      it('expect that [1,2,3,4,5] include 3', function() {
        expect([1,2,3,4,5]).to.be.include(3)
      })


      it('expect that [1,2,3,4,5] not include "TDD é Top"', function() {
        expect([1,2,3,4,5]).to.not.be.include("TDD é Top")
      })
    })
  })

  context("javascript works", function() {
    context("and javscripts object works", function() {
      it('expect that object {attr1: 13 } have attribute "attr1" ', () => {
        expect({ attr1: 13 }).to.have.property('attr1')
      })

      it('expect that object {attr3: 13 } not have attribute "attr1" ', () => {
        expect({ attr3: 13 }).to.not.have.property('attr1')
      })
    })

    context("and javscripts regex works", function() { 
      it("expect that string contains /[Ii]nvesttools/", function() {

        expect('Não existe concorrente com a investtools, para a melhor empresa para se estagiar').to.be.match(/[Ii]nvesttools/)
        expect('Investtools cuida melhor dos seus estagiários que a bloomberg').to.be.match(/[Ii]nvesttools/)
        expect('Somos parte do programa de formção da investtools').to.be.match(/[Ii]nvesttools/)
      })
    })

    context("soma function works", function() {
      it('expect soma(1,1) equals 2', function() {
        expect(soma(1,1)).to.be.eq(2)
      })
      it('expect soma(2,2) equals 4', function() {
        expect(soma(2,2)).to.be.eq(4)
      })

      it('expect soma(2,2) equals 4', function() {
        expect(soma(4,5)).to.be.eq(9)
      })
      it('expect soma(6,7) equals 13', function() {
        expect(soma(6,7)).to.be.eq(13)
      })

      it('expect soma(9,9) equals 18', function() {
        expect(soma(9,9)).to.be.eq(18)
      })
    })

    context("internet is connected", function() {
      it('expect google page contains body tag', function(done) {
        axios.get('https://www.google.com').then(response => {
          expect(response.data).to.be.match(/\<body[^\>]*\>/)
          done()
        }).catch(done)
      })
    })
    context("internet is connected", function() {
      before(function() {
        nock('https://www.google.com')
          .get('/search')
          .reply(200, '<body class="algumacoisa" >')
      })

      it('expect google page contains body tag', function(done) {
        axios.get('https://www.google.com/search').then(response => {
          expect(response.data).to.be.match(/\<body[^\>]*\>/)
          done()
        }).catch(done)
      })
    })

    context("internet is not connected", function() {
      before(function() {
        nock('https://www.google.com')
          .get('/search')
          .reply(408)
      })

      it('expect google page contains body tag', function(done) {
        axios.get('https://www.google.com/search').catch((error) => {
          expect(error.response.status).to.be.eq(408)
          done()
        })
      })
    })
  })
})
