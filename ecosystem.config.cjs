 

const apps = ['api'].map(
    name => ({
        name,
        script: `env-cmd --file prod.env node build/src/modules/${name}/index.js`,
        autorestart: true,
        max_memory_restart: '4096M'
    })
) 

module.exports = { apps }