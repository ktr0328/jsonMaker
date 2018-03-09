const { Seq, Map, Range } = require('immutable')
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, process.argv[2])

const obj = require(filePath)
const config = require('./config')
const types = require('./types')(config)

const createEachAttribute = (attributes, i) => Seq(attributes)
  .filter((v, k) => k !== '__config')
  .map(v => types[v](i, v)).toJS()

const createAttributes = (attributes) => {
  const times = (() => {
    if (attributes.__config) return attributes.__config.times || 1
    else return 1
  })()

  return Range(0, times)
    .map(i => createEachAttribute(attributes, i))
}

const createObjects = () => Map(obj)
  .map((attributes) => createAttributes(attributes).toJS())

fs.writeFile('result.json', JSON.stringify(createObjects()), (err) => {
  if (err) console.log(err)
})
