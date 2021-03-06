// Import PRIVATE_KEY, PUBLIC_KEY, VALIDATOR_URL from .env file
const dotenv = require('dotenv')

const { leafHash } = require('./sawtooth-client')

dotenv.config()

const env = {
  privateKey: process.env.PRIVATE_KEY || '',
  publicKey: process.env.PUBLIC_KEY || '',
  restApiUrl: process.env.REST_API_URL || 'http://localhost:8008',
  familyName: 'dndreg-js',
  familyPrefix: leafHash('dndreg-js', 6),
  familyVersion: '1.0'
}

module.exports = env
