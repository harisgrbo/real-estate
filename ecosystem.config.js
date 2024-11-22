module.exports = {
    apps: [
        {
            name: 'MojKvadrat',
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            instances: 'max',
            exec_mode: 'cluster',
            interpreter: '/home/forge/.nvm/versions/node/v14.21.3/bin/node'
        }
    ]
};
