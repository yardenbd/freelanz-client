const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
    const config = getDefaultConfig(__dirname);

    config.resolver.assetExts = config.resolver.assetExts.filter(
        (ext) => ext !== "svg"
    );
    config.resolver.sourceExts.push("svg", "js", "json", "ts", "tsx");

    config.transformer = {
        babelTransformerPath: require.resolve("react-native-svg-transformer"),
        ...config.transformer,
    };

    return config;
})();
