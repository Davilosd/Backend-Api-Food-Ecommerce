const learnApi = require('./learnApi')
const testApi = require('./test')
const unitApi = require('./unitApi')
const questionApi = require('./questionApi')
const loginApi = require('./loginApi')
const questionMApi = require('./questionMApi')
const nhungApi = require('./nhung')
const lessonsApi = require('./lessonsApi')
const accountApi = require('./accountApi')
const helpersApi = require('./helpersApi')

 
function api(app) {
    learnApi(app)
    testApi(app)
    unitApi(app)
    questionApi(app)
    loginApi(app)
    questionMApi(app)
    nhungApi(app)
    lessonsApi(app)
    accountApi(app)
    helpersApi(app)
}


module.exports = api