var nodeExternals = require('webpack-node-externals');

module.exports = function(env) {
    return {
        target: "node",
        resolve: {
            modules: ["src"]
        },
        externals: [nodeExternals()]
    }
}