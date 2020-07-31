const path = require('path');

module.exports = {
    devtool: 'source-map',
    entry: ['@babel/polyfill', './src/main/resources/js/init.js'],
    output: {
        path: path.join(__dirname, 'src/main/resources/js_ES5'),
        filename: 'init.js',
        publicPath: path.join(__dirname, 'src/main/resources/js_ES5'),
        libraryTarget: 'amd-require'
    },
    module: {
        rules: [
            {
                test: /\.js/,
                use:[
                    {
                        loader: 'babel-loader',
                        options: { presets: ['@babel/preset-env'] }
                    }
                ]
            }
        ]
    },
    externals: ['bitbucket/util/navbuilder']
}