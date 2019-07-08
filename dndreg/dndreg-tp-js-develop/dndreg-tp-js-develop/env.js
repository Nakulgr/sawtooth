const dotenv = require('dotenv')

dotenv.config()

const env = {
  validatorUrl: process.env.VALIDATOR_URL || 'tcp://13.127.217.161:4004'
}

module.exports = env
