const {google} = require('googleapis') 
const sheets = google.sheets('v4')
const fs = require('fs')

const fetchMeta = params => new Promise( (resolve, reject) => {

  let meta = {
      timeZone: null,
      tables: []
  }

  sheets.spreadsheets.get(params)
    .then( res => {
      meta.timeZone = res.data.properties.timeZone
      for (let sh of res.data.sheets) {
        meta.tables.push(sh.properties.title)
      }
      resolve(meta)
    })
    .catch( err => reject(err) )

})

const fetchTable = (params,name) => new Promise( (resolve, reject) => {

  //console.log(`Now fetching ${name}`)

  sheets.spreadsheets.values.get({...params, ...{range:name}})
    .then( res => {
      let sheet = res.data.values

      let meta = {
          name: name,
          colNames: undefined,
          rowNames: undefined
      }

      let data
      
      meta.colNames = sheet.shift()

      if (! meta.colNames[0]) {

        data = {}             // keyed

        //console.log(`${name} is keyed table`)

        meta.colNames.shift()
        for (let name of meta.colNames) {
          data[name] = {}
        }
        meta.rowNames = []

        //console.log(`${name} has fields: ${meta.colNames}`)
        for (let row of sheet) {

          // consume the first col as key
          let rowName = row.shift()
          meta.rowNames.push(rowName)

          // now the rest
          for (let n = 0; n < row.length; n++) {
            let colName = meta.colNames[n]
            data[colName][rowName] = row[n]
          }
        }
      }
      
      else {

        data = []             // simple

        //console.log(`${name} is simple table`)
        //
        for (let row of sheet) {
          let obj = {}
          for (let n = 0; n < row.length; n++) {
            obj[meta.colNames[n]] = row[n]
          }
          data.push(obj)
        }
      }

      //console.log(`${name} fetched.`)
      resolve({data, meta})

    }).catch( err => reject(err) )

})

const fetch = params => new Promise( (resolve, reject) => {

  fetchMeta(params)
    .then( meta => {

      // simultaneously pull down all tables from spreadsheet
      Promise.all( meta.tables.map( name => fetchTable(params,name) ) )
      .then( tables => {
        let data = {
          meta: { ...meta, ...{tables:[]} },
        }
        for (let table of tables) {
          data.meta.tables.push(table.meta)
          data[table.meta.name] = table.data
        }
        resolve(data)
      }).catch( err => reject(err) )
      
    })

})

const save = (params,file='data.json') => new Promise( (res, rej) => {
  fetch(params)
  .then( data => {
    fs.writeFile( file, JSON.stringify(data), err => {
      if (err) rej(err)
      else res(data)
    })
  }).catch( err => rej(err) )
})

module.exports = {
  fetchMeta,
  fetchTable,
  fetch,
  save
}
