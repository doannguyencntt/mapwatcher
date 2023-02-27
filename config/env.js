'use strict'
const dotenv = require('dotenv')
let env = dotenv.config().parsed
const fs = require('fs')
const path = require('path')
const prod = require('./prod')
const dev = require('./dev')
const uat = require('./uat')
let rawEnv = fs.existsSync(path.resolve(__dirname, '../env.json'))
  ? fs.readFileSync(path.resolve(__dirname, '../env.json'))
  : '{}'

let rawSubmoduleEnv = fs.existsSync(path.resolve(__dirname, '../../../env.json'))
  ? fs.readFileSync(path.resolve(__dirname, '../../../env.json'))
  : '{}'

const rawParse = JSON.parse(rawEnv)
const rawSubmoduleParse = JSON.parse(rawSubmoduleEnv)
env = env || {}

console.log('rawSubmoduleParse', rawSubmoduleParse)

// config environment variable with prefix "VUE_APP_"
process.env = {
  ...process.env,
  ...mapEnvServerToEnvClient(env),
  ...(process.env.BABEL_ENV === 'development' ? dev.env : {}),
  ...(process.env.BABEL_ENV === 'production' ? prod.env : {}),
  ...(process.env.BABEL_ENV === 'uat' ? uat.env : {}),
  ...mapEnvServerToEnvClient(rawParse),
  ...mapEnvServerToEnvClient(rawSubmoduleParse)
}

function mapEnvServerToEnvClient(env) {
  const tempEnv = Object.keys(env).reduce((prev, next) => {
    prev[`${next}`] = env[next]
    return prev
  }, {})
  return tempEnv
}
