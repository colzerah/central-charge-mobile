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
    //
    // The scale animation itself is only visible on iOS. On Android, under
    // the New Architecture, react-native-maps' marker snapshot tracker only
    // ever captures this child view once at mount and never re-snapshots it
    // afterwards — confirmed by forcing a full remount (different `key`) on
    // selection change, which still produced zero visual change. No JS-side
    // animation technique (Reanimated, classic Animated, or manual rAF+
    // setState) can work around that: it's a native-side limitation of this
    // combination of react-native-maps + Fabric, not something fixable here.
    <Marker {...markerProps} tracksViewChanges>
      <Animated.View style={animatedStyle}>
        <MapPin variant={variant} />
      </Animated.View>
    </Marker>
  );
};

export default AnimatedMapMarker;
