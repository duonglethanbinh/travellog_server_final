const path = require('path');
var nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'my-webpack.bundle.js'
    },
    target: 'node', // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
};

//Solve problem error: Can't resolve 'aws-sdk'
//https://github.com/liady/webpack-node-externals