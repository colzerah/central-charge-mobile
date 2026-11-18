import BackgroundGradient from "@/src/components/BackgroundGradient";
import Button from "@/src/components/Button";
import ButtonIcon from "@/src/components/ButtonIcon";
import CardInfo from "@/src/components/CardItems/CardInfo";
import CardPlug from "@/src/components/CardItems/CardPlug";
import Icon from "@/src/components/Icon";
import StationCard from "@/src/components/StationCard";
import SummaryCard from "@/src/components/SummaryCard";
import TimeTable from "@/src/components/TimeTable";
import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { useTranslation } from "@/src/hooks/useTranslation";
import { useAppSelector } from "@/src/redux/store";
import { openPhoneDialer } from "@/src/utils/phoneDialer";
import { useRouter } from "expo-router";
import { Pressable, Text, View, useWindowDimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { makePinDetailStyles } from "./styles";

export default function ViewPinDetalhes() {
  const { colors: C } = useTheme();
  const pinDetailStyles = useThemedStyles(makePinDetailStyles);
  const router = useRouter();
  const { t } = useTranslation();
  const { height, width } = useWindowDimensions();
  const { values } = useAppSelector((state) => state.appState.home);

  return (
    <BackgroundGradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={pinDetailStyles.container}>
          <View style={pinDetailStyles.viewStation}>
            <StationCard title={values.pinSelected?.name!} type="AVAILABLE" />
          </View>
          <View style={pinDetailStyles.viewSummary}>
            <SummaryCard
              icon="Zap"
              value={values.pinSelected?.kwhmax!}
              label={t("stationDetails.kwMax") /* pt: "kW máx" */}
            />
            <SummaryCard icon="Navigation" value={1.5} label="km" />
            <SummaryCard
              icon="Star"
              value={values.pinSelected?.r$kwh!}
              label={t("stationDetails.pricePerKwh") /* pt: "R$/kWh" */}
            />
          </View>
          <View style={pinDetailStyles.section}>
            <Text style={pinDetailStyles.title}>
              {t("stationDetails.plugs") /* pt: "PLUGS DISPONÍVEIS" */}
            </Text>
          </View>
          <View style={pinDetailStyles.viewPlug}>
            {values.pinSelected?.plugs.map((plug) => (
              <CardPlug
                key={plug.id}
                title={plug.title}
                titleSmall={plug.titleSmall}
                titleKw={`${plug.kw} kW`}
              />
            ))}
          </View>
          <View style={pinDetailStyles.section}>
            <Text style={pinDetailStyles.title}>
              {t("stationDetails.address") /* pt: "ENDEREÇO" */}
            </Text>
          </View>
          <View style={pinDetailStyles.viewCardInfo}>
            <View style={pinDetailStyles.viewCardInfoContent}>
              <CardInfo
                description={values.pinSelected?.adress!}
                iconName="MapPinned"
              />
            </View>
            <View>
              <ButtonIcon
                icon={"Navigation"}
                square
                size="lg"
                onPress={() => console.log("click no endereco")}
              />
            </View>
          </View>
          <View style={pinDetailStyles.section}>
            <Text style={pinDetailStyles.title}>
              {t("stationDetails.support") /* pt: "SUPORTE TÉCNICO" */}
            </Text>
          </View>
          <View>
            <CardInfo
              iconName="Phone"
              description={values.pinSelected?.supportNumber!}
              onPress={() =>
                openPhoneDialer(values.pinSelected?.supportNumber!)
              }
            />
          </View>
          <View style={pinDetailStyles.viewPressError}>
            <Pressable
              style={({ pressed }) => [
                pinDetailStyles.pressableError,
                { opacity: pressed ? 0.5 : 1 },
              ]}
              onPress={() => router.navigate("/reportar-estacao")}
            >
              <Icon
                name="CircleAlert"
                color={C.error}
                size={18}
                strokeWidth={2.2}
              />
              <Text style={pinDetailStyles.titleError}>
                {
                  t(
                    "stationDetails.reportProblem",
                  ) /* pt: "Relatar um problema" */
                }
              </Text>
            </Pressable>
          </View>
          <View style={pinDetailStyles.section}>
            <Text style={pinDetailStyles.title}>
              {
                t(
                  "stationDetails.schedule",
                ) /* pt: "HÓRARIOS DE FUNCIONAMENTO" */
              }
            </Text>
          </View>
          <View>
            <TimeTable items={values.pinSelected?.schedules!} />
          </View>
          <View style={[pinDetailStyles.viewButton, { height: height * 0.3 }]}>
            <View>
              <Button
                title={t("stationDetails.scanQr") /* pt: "Escanear QR Code" */}
                iconLeft="QrCode"
                size="lg"
                w={310}
                onPress={() => router.navigate("/scan-detalhes")}
              />
            </View>
            <View>
              <ButtonIcon
                icon="Star"
                square
                size="md"
                variant="outline"
                border
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </BackgroundGradient>
  );
}
