import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
  type BottomSheetBackdropProps,
} from "@gorhom/bottom-sheet";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { useFocusEffect } from "expo-router";

import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { openNavigation } from "@/src/utils/openNavigation";
import Button from "../Button";
import ButtonIcon from "../ButtonIcon";
import CardPlug from "../CardItems/CardPlug";
import Tag from "../Tag";
import {
  BottomSheetModalHandle,
  MapButtonSheetProps,
  MapButtonSheetRef,
} from "./MapButtronSheetDTO";
import { mapButtonSheetStyles } from "./styles";

const MapButtonSheet = forwardRef<MapButtonSheetRef, MapButtonSheetProps>(
  function MapButtonSheet(
    { openOnFocus = false, onClose, selectedMarket }: MapButtonSheetProps,
    ref,
  ) {
    const {
      name,
      variant,
      plugs = [],
      qtdPlugs,
      adress,
      coordinate,
    } = selectedMarket;

    const sheetRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();

    useImperativeHandle(
      ref,
      () => ({
        present: () => sheetRef.current?.present(),
        dismiss: () => sheetRef.current?.dismiss(),
      }),
      [],
    );

    useFocusEffect(
      useCallback(() => {
        if (openOnFocus) {
          sheetRef.current?.present();
        } else {
          (sheetRef.current as BottomSheetModalHandle | null)?.restore();
        }

        return () =>
          (sheetRef.current as BottomSheetModalHandle | null)?.minimize();
      }, [openOnFocus]),
    );

    const handleClose = useCallback((): void => {
      sheetRef.current?.dismiss();
    }, []);

    const handleAnimate = useCallback(
      (_fromIndex: number, toIndex: number): void => {
        if (toIndex === -1) onClose?.();
      },
      [onClose],
    );

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          opacity={0.4}
          pressBehavior="close"
        />
      ),
      [],
    );

    const bottomInset = useMemo(() => insets.bottom - 16 + 1, [insets.bottom]);

    const renderTag = useMemo(() => {
      console.log("variant", variant);
      if (variant === "BROKEN") {
        return <Tag title="Indisponível" size="md" dot type="danger" />;
      }

      if (variant === "OCCUPIED") {
        return <Tag title="Ocupado" size="md" dot type="warning" />;
      }

      return <Tag title="Disponivel" size="md" dot type="success" />;
    }, [variant]);

    return (
      <BottomSheetModal
        ref={sheetRef}
        detached
        bottomInset={bottomInset}
        enablePanDownToClose
        enableDynamicSizing
        onAnimate={handleAnimate}
        onDismiss={onClose}
        backdropComponent={renderBackdrop}
        handleComponent={null}
        backgroundStyle={mapButtonSheetStyles.background}
        style={mapButtonSheetStyles.sheet}
      >
        <BottomSheetView style={mapButtonSheetStyles.content}>
          <View style={mapButtonSheetStyles.header}>
            <View style={mapButtonSheetStyles.headerRow}>
              <View style={mapButtonSheetStyles.tagView}>{renderTag}</View>
              <View style={mapButtonSheetStyles.row}>
                <ButtonIcon
                  icon="Star"
                  size="sm"
                  variant="outline"
                  onPress={() => console.log("favoritar")}
                />
                <ButtonIcon
                  icon="CircleX"
                  size="sm"
                  variant="outline"
                  onPress={handleClose}
                />
              </View>
            </View>
          </View>

          <Text style={mapButtonSheetStyles.title}>{name}</Text>
          <Text style={mapButtonSheetStyles.description}>
            {adress} · 1,2 km
          </Text>
          <View style={mapButtonSheetStyles.viewSubTitle}>
            <Text style={mapButtonSheetStyles.subTitle}>PLUGS NESTE PONTO</Text>
            <Text style={mapButtonSheetStyles.subTitle}>
              {qtdPlugs} conectores
            </Text>
          </View>
          <View style={mapButtonSheetStyles.viewPlug}>
            {plugs.map((item) => (
              <CardPlug
                key={item.id}
                title={item.title}
                titleSmall={item.titleSmall}
                titleKw={"60.0 kW"}
                plugName={item.plugName}
                plugStatus={item.status}
              />
            ))}
          </View>
          <View style={mapButtonSheetStyles.providers}>
            <Button
              title={"Ir"}
              w={164}
              size="sm"
              iconLeft="MapPinCheck"
              onPress={() =>
                coordinate && openNavigation({ ...coordinate, label: name })
              }
            />
            <Button
              title={"Ver detalhes"}
              w={164}
              size="sm"
              iconRight="ArrowBigRight"
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export { MapButtonSheet };
export default memo(MapButtonSheet);
