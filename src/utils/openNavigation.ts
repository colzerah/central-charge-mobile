import { ActionSheetIOS, Alert, Linking, Platform } from "react-native";

interface Destination {
  latitude: number;
  longitude: number;
  label?: string;
}

interface NavigationApp {
  name: string;
  url: string;
}

// Apps de navegação suportados no iOS. Os schemes (exceto "maps") precisam
// estar em ios.infoPlist.LSApplicationQueriesSchemes no app.json para que o
// canOpenURL consiga detectar se o app está instalado.
const getIOSApps = ({ latitude, longitude }: Destination): NavigationApp[] => [
  {
    name: "Apple Maps",
    url: `maps://?daddr=${latitude},${longitude}&dirflg=d`,
  },
  {
    name: "Google Maps",
    url: `comgooglemaps://?daddr=${latitude},${longitude}&directionsmode=driving`,
  },
  {
    name: "Waze",
    url: `waze://?ll=${latitude},${longitude}&navigate=yes`,
  },
];

const openURL = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert("Ops", "Não foi possível abrir o app de navegação.");
  }
};

const openNavigationIOS = async (destination: Destination) => {
  const apps = getIOSApps(destination);
  const installed = (
    await Promise.all(
      apps.map(async (app) =>
        (await Linking.canOpenURL(app.url).catch(() => false)) ? app : null,
      ),
    )
  ).filter((app): app is NavigationApp => app !== null);

  // Apple Maps sempre existe; se for o único, abre direto
  if (installed.length <= 1) {
    return openURL(installed[0]?.url ?? apps[0].url);
  }

  ActionSheetIOS.showActionSheetWithOptions(
    {
      title: "Abrir rota com",
      options: [...installed.map((app) => app.name), "Cancelar"],
      cancelButtonIndex: installed.length,
      userInterfaceStyle: "dark",
    },
    (index) => {
      if (index < installed.length) openURL(installed[index].url);
    },
  );
};

// No Android o intent "geo:" abre o seletor nativo do sistema com todos os
// apps de mapa instalados (Google Maps, Waze, etc.)
const openNavigationAndroid = ({ latitude, longitude, label }: Destination) => {
  const query = label
    ? `${latitude},${longitude}(${encodeURIComponent(label)})`
    : `${latitude},${longitude}`;

  return openURL(`geo:${latitude},${longitude}?q=${query}`);
};

export const openNavigation = (destination: Destination) => {
  if (Platform.OS === "ios") {
    return openNavigationIOS(destination);
  }

  return openNavigationAndroid(destination);
};
