const {google} = require('googleapis') 
const sheets = google.sheets('v4')

function fetchMeta(params) {
  return new Promise( (resolve, reject) => {

    let data = {
      _: {
        timeZone: null,
        schema: []
      }
    }

    sheets.spreadsheets.get(params)
      .then( res => {
        data._.timeZone = res.data.properties.timeZone
        for (let sh of res.data.sheets) {
          data._.schema.push(sh.properties.title)
        }
        resolve(data)
      })
      .catch( err => reject(err) )

  })
}

module.exports = {
  fetchMeta
}
