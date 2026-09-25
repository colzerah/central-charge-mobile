import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";
import { Camera } from "expo-camera";

type UsePermissionsResult = {
  allowLocationAccess: boolean;
  allowCameraAccess: boolean;
  localization: () => Promise<boolean>;
  camera: () => Promise<boolean>;
};

export function usePermissions(): UsePermissionsResult {
  const [allowLocationAccess, setAllowLocationAccess] = useState(false);
  const [allowCameraAccess, setAllowCameraAccess] = useState(false);

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ status }) => {
      setAllowLocationAccess(status === "granted");
    });
    Camera.getCameraPermissionsAsync().then(({ status }) => {
      setAllowCameraAccess(status === "granted");
    });
  }, []);

  const localization = useCallback(async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    const granted = status === "granted";
    setAllowLocationAccess(granted);
    return granted;
  }, []);

  const camera = useCallback(async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    const granted = status === "granted";
    setAllowCameraAccess(granted);
    return granted;
  }, []);

  return { allowLocationAccess, allowCameraAccess, localization, camera };
}
