import { useEffect, useRef, useState } from "react";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Marker, MapMarkerProps } from "react-native-maps";
import MapPin from ".";
import { MapPinProps } from "./MapPinDTO";

type AnimatedMapMarkerProps = MapMarkerProps &
  MapPinProps & {
    selected?: boolean;
  };

const AnimatedMapMarker = ({
  variant,
  selected = false,
  ...markerProps
}: AnimatedMapMarkerProps) => {
  const scale = useSharedValue(1);
  const [tracksViewChanges, setTracksViewChanges] = useState(false);
  const isFirstRender = useRef(true);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setTracksViewChanges(true);
    scale.value = withTiming(selected ? 1.25 : 1, { duration: 180 }, (finished) => {
      if (finished) runOnJS(setTracksViewChanges)(false);
    });
  }, [selected]);

  return (
    <Marker {...markerProps} tracksViewChanges={tracksViewChanges}>
      <Animated.View style={animatedStyle}>
        <MapPin variant={variant} />
      </Animated.View>
    </Marker>
  );
};

export default AnimatedMapMarker;
