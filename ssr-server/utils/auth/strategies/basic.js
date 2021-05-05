const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
// nos permite hacer request a otros servidores, en este caso será a nuestro api-server
const axios = require('axios')
const { config } = require('../../../config/index')

passport.use(new BasicStrategy(async function (email, password, cb) {
  try {
    const { data, status } = await axios({
      // url a la que vamos hacer el request
      url: `${config.apiUrl}/api/auth/sign-in`,
      method: 'post',
      auth: {
        password,
        username: email
      },
      data: {
        apiKeyToken: config.apiKeyToken
      }
    })
    if (!data || status !== 200) {
      return cb(boom.unauthorized(), false)
    }

    return cb(null, data)
  } catch (error) {
    cb(error)
  }
}))