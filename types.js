const { Range } = require('immutable')
const uppers = Range(65, 65 + 26).map(e => String.fromCharCode(e)).toJS()
const lowers = Range(97, 97 + 26).map(e => String.fromCharCode(e)).toJS()
const mix = uppers.concat(lowers)

module.exports = (config) => {
  return {
    auto_increment: (i, v) => {
      return i + config.auto_increment.start
    },
    string: (i, v) => {
      return Range(0, 8).map(e => mix[Math.floor(Math.random() * mix.length) - 1]).toJS().join('')
    },
    number: (i, v) => {
      return config.number.start + Math.floor(Math.random() * config.number.end)
    },
    boolean: (i, v) => {
      return !!Math.round(Math.random())
    }
  }
}
