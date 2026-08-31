import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { usePermissions } from "./usePermissions";

export type Coordinates = {
  latitude: number;
  longitude: number;
  accuracy: number | null;
  altitude: number | null;
  heading: number | null;
  speed: number | null;
  timestamp: number;
};

type UseCoordinatesResult = {
  coordinates: Coordinates | null;
  errorMsg: string | null;
  isLoading: boolean;
};

export function useCoordinates(): UseCoordinatesResult {
  const { allowLocationAccess } = usePermissions();
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);

  useEffect(() => {
    if (!allowLocationAccess) {
      setErrorMsg("Permissão de localização negada");
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    (async () => {
      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          if (!isMounted) return;
          setCoordinates({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            accuracy: location.coords.accuracy,
            altitude: location.coords.altitude,
            heading: location.coords.heading,
            speed: location.coords.speed,
            timestamp: location.timestamp,
          });
          setIsLoading(false);
        },
      );
    })().catch((error: unknown) => {
      if (isMounted) {
        setErrorMsg(
          error instanceof Error ? error.message : "Erro ao obter localização",
        );
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      subscriptionRef.current?.remove();
      subscriptionRef.current = null;
    };
  }, [allowLocationAccess]);

  return { coordinates, errorMsg, isLoading };
}
