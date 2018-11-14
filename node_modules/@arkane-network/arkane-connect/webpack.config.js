const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
        filename: 'connect.js',
        path: path.join(__dirname, '.'),
        // path: path.join(__dirname, '../../example/node_modules/@arkane-network/arkane-connect'),
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
                query: {
                    declaration: false,
                },
            },
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
};