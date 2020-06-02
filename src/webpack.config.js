const fs = require('fs');
const path = require('path');

module.exports = {
    mode: 'production',
    // ...
    devServer: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, '../../certs/frontend.key')),
            cert: fs.readFileSync(path.resolve(__dirname, '../../certs/frontend.crt')),
        },
        port: 3000,
    },
};