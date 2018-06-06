const {expect} = require('chai')
const gsobj = require('../')

const conf = {
  spreadsheetId: '1L_596HdNVS_cYo_wG8WrwEaOwq5_mAsxliyVIqxZ3Tg',
  key: 'AIzaSyA8UfZselVWFFh63a9Ak_Tdml28WchWsGY',
}

describe('fetchMeta(conf)', _ => {
  it('should return an object', done => {
    gsobj.fetchMeta(conf)
      .then(data => {
        expect(data._.timeZone).to.be.equal('America/New_York')
        expect(data._.schema).to.be.a('Array')
        expect(data._.schema[0]).to.be.equal('Calendar')
        done()
      }).catch(err => console.log(err))
  })
})
