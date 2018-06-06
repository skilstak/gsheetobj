const {expect} = require('chai')
const gsobj = require('../')


const params = {
  spreadsheetId: '1L_596HdNVS_cYo_wG8WrwEaOwq5_mAsxliyVIqxZ3Tg',
  key: 'AIzaSyA8UfZselVWFFh63a9Ak_Tdml28WchWsGY',
}

describe('fetchMeta(params)', _ => {
  it('should fetch the meta data as a promise', done => {
    gsobj.fetchMeta(params)
      .then( meta => {
        expect(meta.timeZone).to.be.equal('America/New_York')
        expect(meta.tables).to.be.a('Array')
        expect(meta.tables[0]).to.be.equal('Calendar')
        done()
      }).catch(err => console.log(err))
  })
})


describe('fetch(params)', _ => {
  it('should fetch all the data as a promise', done => {
    gsobj.fetch(params)
      .then(data => {
        expect(data.meta.tables).to.be.a('Array')
        expect(data.meta.tables[0].name).to.be.equal('Calendar')
        expect(data.Calendar[0].Date).to.be.equal('Friday, June 1, 2018')
        expect(data.Calendar[0].Description).to.be.equal('Open house postponed due to roofing work')
        done()
      }).catch(err => console.log(err))
  })
})


describe('fetchTable(params,name)', _ => {
  it ('should fetch a single table and return a promise', done => {
    gsobj.fetchTable(params,'Calendar')
      .then( table => {
        expect(table).to.be.a('Object')
        expect(table.meta).to.be.a('Object')
        expect(table.data).to.be.a('Array')
        expect(table.meta.colNames[0]).to.be.equal('Date')
        expect(table.meta.colNames[1]).to.be.equal('T')
        expect(table.meta.colNames[2]).to.be.equal('Description')
        expect(table.data[0]).to.be.a('Object')
        expect(table.data[0].Date).to.be.equal('Friday, June 1, 2018')
        expect(table.data[0].Description).to.be.equal('Open house postponed due to roofing work')
        done()
      }).catch(err => console.log(err))
  })
})

describe('save(params,file)', _ => {
  it ('should fetch a single table and return a promise', done => {
    gsobj.save(params)
      .then( data => {
        expect(data.meta.tables).to.be.a('Array')
        //expect(data.meta.tables[0].name).to.be.equal('Calendar')
        expect(data.Calendar[0].Date).to.be.equal('Friday, June 1, 2018')
        done()
      }).catch(err => console.log(err))
  })
})

