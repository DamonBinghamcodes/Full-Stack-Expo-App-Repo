const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

config.resolver = {
    ...config.resolver,
    sourceExts: [...config.resolver.sourceExts, "scss", "sass", "css"],
    extraNodeModules: {
        ...config.resolver.extraNodeModules,
        "react-native-css-interop": require.resolve("react-native-css-interop"),
    },
    unstable_enablePackageExports: true,
};

module.exports = withNativeWind(config, { input: "./global.css" });
