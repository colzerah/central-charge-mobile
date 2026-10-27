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
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { router, useFocusEffect } from "expo-router";

import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MarketsInterface } from "@/src/app/(app)/(tabs)/home";
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
    {
      openOnFocus = false,
      onClose,
      selectedMarket,
      animatedIndex,
    }: MapButtonSheetProps,
    ref,
  ) {
    const {
      name,
      variant,
      plugs = [],
      qtdPlugs,
      adress,
      coordinate,
    } = selectedMarket ?? ({} as Partial<MarketsInterface>);

    const sheetRef = useRef<BottomSheetModal>(null);
    const insets = useSafeAreaInsets();

    // true enquanto a tela está sem foco: o minimize() também anima para -1 e,
    // por um bug do @gorhom/bottom-sheet (o onChange(-1) troca o status de
    // MINIMIZING para MINIMIZED antes do onClose interno), ele acaba
    // desmontando o modal e disparando onDismiss. Nada disso é um fechamento
    // feito pelo usuário, então não deve chamar onClose.
    const isMinimizingRef = useRef(false);
    const hasSelectionRef = useRef(false);
    hasSelectionRef.current = !!selectedMarket;

    // o sheet só abre com um pin selecionado no estado
    const present = useCallback((): void => {
      if (hasSelectionRef.current) sheetRef.current?.present();
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        present,
        dismiss: () => sheetRef.current?.dismiss(),
      }),
      [present],
    );

    // abre depois que o pin selecionado chega na prop, nunca antes
    useEffect(() => {
      present();
    }, [selectedMarket, present]);

    useFocusEffect(
      useCallback(() => {
        isMinimizingRef.current = false;

        // o minimize() desmonta o modal (ver acima), então restore() não tem o
        // que restaurar: apresenta de novo se ainda há um pin selecionado
        if (openOnFocus || hasSelectionRef.current) present();

        return () => {
          isMinimizingRef.current = true;
          (sheetRef.current as BottomSheetModalHandle | null)?.minimize();
        };
      }, [openOnFocus, present]),
    );

    const handleClose = useCallback((): void => {
      sheetRef.current?.dismiss();
    }, []);

    const handleDismiss = useCallback((): void => {
      if (!isMinimizingRef.current) onClose?.();
    }, [onClose]);

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
        // limpa o pin só no fim do fechamento: durante a animação o pin
        // continua selecionado e encolhe seguindo o animatedIndex
        onDismiss={handleDismiss}
        animatedIndex={animatedIndex}
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
                titleKw={`${item.kw} kW`}
                plugName={item.plugName}
                plugStatus={item.status}
                borderActive
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
              onPress={() => router.navigate("/pin-detalhes")}
            />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

export { MapButtonSheet };
export default memo(MapButtonSheet);
