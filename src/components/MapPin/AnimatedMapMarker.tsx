import { ANIMATION_DURATION, ANIMATION_EASING } from "@gorhom/bottom-sheet";
import { useEffect } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Marker, MapMarkerProps } from "react-native-maps";
import MapPin from ".";
import { MapPinProps } from "./MapPinDTO";
import { PIN } from "./styles";

const SELECTED_SCALE = 1.25;

// A ponta da gota marca a coordenada, não o centro do pin. Cada plataforma
// usa uma prop: Android (e Google Maps no iOS) usa `anchor`, em fração da
// imagem; Apple Maps usa `centerOffset`, em pontos a partir do centro.
const TIP_ANCHOR = { x: PIN.tipX / PIN.width, y: PIN.tipY / PIN.height };
const TIP_CENTER_OFFSET = { x: 0, y: -(PIN.tipY - PIN.height / 2) };

type AnimatedMapMarkerProps = MapMarkerProps &
  MapPinProps & {
    selected?: boolean;
    // animatedIndex do sheet (-1 fechado, 0 aberto): o pin cresce e encolhe
    // no mesmo frame que o sheet abre e fecha
    sheetAnimatedIndex?: SharedValue<number>;
  };

const AnimatedMapMarker = ({
  variant,
  selected = false,
  sheetAnimatedIndex,
  ...markerProps
}: AnimatedMapMarkerProps) => {
  const selectedProgress = useSharedValue(selected ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => {
    const sheetProgress = sheetAnimatedIndex
      ? interpolate(
          sheetAnimatedIndex.value,
          [-1, 0],
          [0, 1],
          Extrapolation.CLAMP,
        )
      : 1;

    return {
      transform: [
        {
          scale:
            1 + (SELECTED_SCALE - 1) * selectedProgress.value * sheetProgress,
        },
      ],
    };
  });

  useEffect(() => {
    const target = selected ? 1 : 0;
    const isSheetOpen = !sheetAnimatedIndex || sheetAnimatedIndex.value > -1;

    // com o sheet fechado quem anima é o sheetProgress, então só troca o
    // valor; com o sheet aberto (troca de pin) anima no mesmo tempo do sheet
    selectedProgress.value = isSheetOpen
      ? withTiming(target, {
          duration: ANIMATION_DURATION,
          easing: ANIMATION_EASING,
        })
      : target;
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
    <Marker
      anchor={TIP_ANCHOR}
      centerOffset={TIP_CENTER_OFFSET}
      {...markerProps}
      tracksViewChanges
    >
      {/* cresce a partir da ponta, para ela não sair da coordenada */}
      <Animated.View
        style={[{ transformOrigin: [PIN.tipX, PIN.tipY, 0] }, animatedStyle]}
      >
        <MapPin variant={variant} />
      </Animated.View>
    </Marker>
  );
};

export default AnimatedMapMarker;
