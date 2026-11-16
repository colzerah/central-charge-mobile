import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { AppState } from "react-native";

type PermissionRequestResult = {
  granted: boolean;
  canAskAgain: boolean;
};

type UsePermissionsResult = {
  allowLocationAccess: boolean;
  allowCameraAccess: boolean;
  allowGalleryAccess: boolean;
  localization: () => Promise<PermissionRequestResult>;
  camera: () => Promise<PermissionRequestResult>;
  gallery: () => Promise<boolean>;
};

export function usePermissions(): UsePermissionsResult {
  const [allowLocationAccess, setAllowLocationAccess] = useState(false);
  const [allowCameraAccess, setAllowCameraAccess] = useState(false);
  const [allowGalleryAccess, setAllowGalleryAccess] = useState(false);

  const refreshPermissions = useCallback(async () => {
    const [location, camera, gallery] = await Promise.all([
      Location.getForegroundPermissionsAsync(),
      Camera.getCameraPermissionsAsync(),
      ImagePicker.getMediaLibraryPermissionsAsync(),
    ]);

    setAllowLocationAccess(location.status === "granted");
    setAllowCameraAccess(camera.status === "granted");
    setAllowGalleryAccess(gallery.status === "granted");
  }, []);

  useEffect(() => {
    refreshPermissions();

    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        refreshPermissions();
      }
    });

    return () => subscription.remove();
  }, [refreshPermissions]);

  //   Location.getForegroundPermissionsAsync().then(({ status }) => {
  //     setAllowLocationAccess(status === "granted");
  //   });
  //   Camera.getCameraPermissionsAsync().then(({ status }) => {
  //     setAllowCameraAccess(status === "granted");
  //   });
  //   ImagePicker.getMediaLibraryPermissionsAsync().then(({ status }) => {
  //     setAllowGalleryAccess(status === "granted");
  //   });
  // }, []);

  const localization = useCallback(async () => {
    const result = await Location.requestForegroundPermissionsAsync();
    const granted = result.status === "granted";
    setAllowLocationAccess(granted);
    return {
      granted,
      canAskAgain: result.canAskAgain,
    };
  }, []);

  const camera = useCallback(async () => {
    const result = await Camera.requestCameraPermissionsAsync();
    const granted = result.status === "granted";
    setAllowCameraAccess(granted);
    return {
      granted,
      canAskAgain: result.canAskAgain,
    };
  }, []);

  const gallery = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    const granted = status === "granted";
    setAllowGalleryAccess(granted);
    return granted;
  }, []);

  return {
    allowLocationAccess,
    allowCameraAccess,
    allowGalleryAccess,
    localization,
    camera,
    gallery,
  };
}
