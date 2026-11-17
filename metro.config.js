const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
};
config.resolver = {
  ...resolver,
  assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...resolver.sourceExts, "svg"],
};

const nativewindConfig = withNativewind(config, { inlineRem: 16 });
const nativewindResolveRequest = nativewindConfig.resolver.resolveRequest;

// O NativeWind (react-native-css) troca todo import de "react-native" por uma
// cópia com lista fixa de exports, que não tem o AssetRegistry (novo no RN
// 0.88). O expo-asset depende dele para carregar fontes e assets, então sem
// isso o useFonts falha e o app cai na fonte do sistema. Para o expo-asset,
// usa o react-native de verdade.
const EXPO_ASSET_DIR = `${path.sep}node_modules${path.sep}expo-asset${path.sep}`;

nativewindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    moduleName === "react-native" &&
    context.originModulePath.includes(EXPO_ASSET_DIR)
  ) {
    const parentResolveRequest =
      config.resolver.resolveRequest ?? context.resolveRequest;
    return parentResolveRequest(context, moduleName, platform);
  }
  return nativewindResolveRequest(context, moduleName, platform);
};

module.exports = nativewindConfig;
