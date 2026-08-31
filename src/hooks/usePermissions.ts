import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";

type UsePermissionsResult = {
  allowLocationAccess: boolean;
  localization: () => Promise<boolean>;
};

export function usePermissions(): UsePermissionsResult {
  const [allowLocationAccess, setAllowLocationAccess] = useState(false);

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ status }) => {
      setAllowLocationAccess(status === "granted");
    });
  }, []);

  const localization = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const granted = status === "granted";
    setAllowLocationAccess(granted);
    return granted;
  }, []);

  return { allowLocationAccess, localization };
}
