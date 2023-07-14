const Encore = require('@symfony/webpack-encore');

if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    // Entry config
    .addEntry('base', './assets/styles/base.css')
    .addEntry('dashboard', './assets/styles/dashboard.css')
    .addEntry('index', './assets/styles/index.css')
    .addEntry('post', './assets/styles/post.css')
    .addEntry('w', './assets/styles/w.css')
    
    .addEntry('react-dashboard', './assets/react-dashboard.tsx')
    .addEntry('react-profile', './assets/react-profile.tsx')
    .addEntry('react-post', './assets/react-post.tsx')
    
    // .addEntry('post', './assets/post.js')
    .addEntry('profile', './assets/profile.js')

    // .enableStimulusBridge('./assets/controllers.json')

    .splitEntryChunks()

    .enableSingleRuntimeChunk()

    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // enables Sass/SCSS support
    //.enableSassLoader()

    // uncomment if you use TypeScript
    .enableTypeScriptLoader()

    // uncomment if you use React
    .enableReactPreset()
;

module.exports = Encore.getWebpackConfig();
