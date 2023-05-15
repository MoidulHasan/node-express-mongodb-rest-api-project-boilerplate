Promise = require('bluebird');
const app = require('./src/app.js')
const { port, env } = require('./src/config/vars.js');
const logger = require('./src/config/logger.js');
const mongoose = require('./src/config/mongoose.js');


// open mongoose connection
mongoose.connect();


app.listen(port, () => {
    logger.info(`Server is running on http://localhost:${port}`)
})


module.exports = app;
