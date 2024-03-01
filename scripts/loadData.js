const { parse } = require('csv-parse/sync')
const fs = require('fs')
const { v4 } = require('uuid')



  
const versos = parse(fs.readFileSync('./src/data/data.csv'), {
  delimiter: ';',
  columns: ['verso', 'autor', 'poema', 'poemario']
})

const finalVersos = versos.map(verso => {
    return {id: v4(), ...verso}
})
console.log(finalVersos)

fs.writeFileSync('./src/data/data.json', JSON.stringify(finalVersos))