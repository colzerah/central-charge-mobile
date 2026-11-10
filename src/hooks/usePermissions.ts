import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";

type UsePermissionsResult = {
  allowLocationAccess: boolean;
  allowCameraAccess: boolean;
  allowGaleryAccess: boolean;
  localization: () => Promise<boolean>;
  camera: () => Promise<boolean>;
  galery: () => Promise<boolean>;
};

export function usePermissions(): UsePermissionsResult {
  const [allowLocationAccess, setAllowLocationAccess] = useState(false);
  const [allowCameraAccess, setAllowCameraAccess] = useState(false);
  const [allowGaleryAccess, setAllowGaleryAccess] = useState(false);

  useEffect(() => {
    Location.getForegroundPermissionsAsync().then(({ status }) => {
      setAllowLocationAccess(status === "granted");
    });
    Camera.getCameraPermissionsAsync().then(({ status }) => {
      setAllowCameraAccess(status === "granted");
    });
    ImagePicker.getMediaLibraryPermissionsAsync().then(({ status }) => {
      setAllowGaleryAccess(status === "granted");
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

  const galery = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const granted = status === "granted";
    setAllowGaleryAccess(granted);
    return granted;
  }, []);

  return {
    allowLocationAccess,
    allowCameraAccess,
    allowGaleryAccess,
    localization,
    camera,
    galery,
  };
}
