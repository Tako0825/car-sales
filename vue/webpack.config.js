const { resolve } = require("path") 

module.exports = webpackConfig = {
    mode: 'development',
    resolve: {
        alias: {
            "@": resolve(__dirname,"src/")
        }
    }
}