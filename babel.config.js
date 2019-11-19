module.exports = api => {
    api.cache(true);

    const presets = [
        '@babel/preset-env',
        '@babel/preset-typescript'
    ];

    return {
        presets,
        plugins: [
            '@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            ["@babel/plugin-proposal-decorators", {"legacy": true}]
        ]
    }
}
