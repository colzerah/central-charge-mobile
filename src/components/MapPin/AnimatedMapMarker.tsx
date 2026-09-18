import { useEffect } from "react";
import Animated, {
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
  const scale = useSharedValue(selected ? 1.25 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  useEffect(() => {
    scale.value = withTiming(selected ? 1.25 : 1, { duration: 180 });
  }, [selected]);

  return (
    // tracksViewChanges is kept always true: toggling it back to false after
    // the scale animation is what freezes this marker's touch area on
    // Android (react-native-maps takes a static snapshot for the "false"
    // state, and re-arming it reliably requires another marker to force a
    // redraw). With only a handful of markers the always-live view has no
    // noticeable performance cost.
    <Marker {...markerProps} tracksViewChanges>
      <Animated.View style={animatedStyle}>
        <MapPin variant={variant} />
      </Animated.View>
    </Marker>
  );
};

export default AnimatedMapMarker;
