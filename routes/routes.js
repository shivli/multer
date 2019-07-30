module.exports = (app) => {
    const path = require('../controller/multer.js');

    // upload multiple files
    app.post('/bulk', path.bulk);
}