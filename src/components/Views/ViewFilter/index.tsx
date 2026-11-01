import { C } from "@/src/theme";
import * as icons from "lucide-react-native/icons";
import { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import ButtonIcon from "../../ButtonIcon";
import CardBrand from "../../CardItems/CardBrand";
import CardFilter from "../../CardItems/CardFilter";
import Seek from "../../Seek";

interface TitleFilter {
  title: string;
  description: string;
  iconName: keyof typeof icons;
}

interface SeekLabel {
  min: string;
  value: string | number;
}

const SEEK_MIN_KM = 0;
const SEEK_MAX_KM = 300;

const SEEK_MIN_KW = 0;
const SEEK_MAX_KW = 350;

const MOCK_BRANDS = [
  {
    id: 0,
    name: "EasyCharge",
    station: 1,
    active: false,
    uri: "https://cdn.aptoide.com/imgs/a/8/d/a8dd37571f8e05e9a1e2da4be769e6a0_icon.png",
  },
  { id: 1, name: "EasyVoltz", station: 2, active: false, uri: "" },
  { id: 2, name: "CentralCharge", station: 100, active: false, uri: "" },
];

export default function ViewFilter() {
  const [available, setAvailable] = useState(false);
  const [occupied, setOccupied] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const [valueKm, setValueKm] = useState(0);
  const [valueKw, setValueKw] = useState(0);

  const [brands, setBrands] = useState(MOCK_BRANDS);

  const labelSeekKm = useMemo((): string => {
    if (valueKm === SEEK_MAX_KM) {
      return "Sem limite";
    }
    return `${valueKm} km`;
  }, []);

  const labelSeekKw = useMemo((): string => {
    if (valueKw === SEEK_MIN_KW) {
      return "";
    }

    return `${valueKw} kW`;
  }, []);

  const renderTitleFilter = ({ title, description, iconName }: TitleFilter) => (
    <View style={{ flexDirection: "row", gap: 8, alignItems: "flex-end" }}>
      <View style={{ height: 50 }}>
        <ButtonIcon icon={iconName} size="sm" variant="outline" />
      </View>
      <View style={{ gap: 8 }}>
        <Text
          style={{
            fontSize: 15,
            fontWeight: "700",
            color: C.white,
            fontFamily: "Inter-Bold",
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontSize: 12,
            color: C.ink400,
            fontFamily: "Inter-Regular",
          }}
        >
          {description}
        </Text>
      </View>
    </View>
  );

  const renderSeekValue = (value: number | string) => (
    <View
      style={{
        alignItems: "flex-end",
        width: "93%",
        marginBottom: 8,
      }}
    >
      <Text
        style={{
          fontSize: 14,
          fontWeight: "700",
          color: C.brand400,
          fontFamily: "Inter-Bold",
        }}
      >
        {value}
      </Text>
    </View>
  );

  const renderSeekLabel = ({ min, value }: SeekLabel) => (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        width: "93%",
        marginTop: 4,
      }}
    >
      <Text
        style={{
          fontSize: 11,
          color: C.ink400,
          fontFamily: "Inter-Regular",
        }}
      >
        {min}
      </Text>
      <Text
        style={{
          fontSize: 11,
          color: C.ink400,
          fontFamily: "Inter-Regular",
        }}
      >
        {value}
      </Text>
    </View>
  );

  const handleClickBrand = (id: number) => {
    setBrands((prev) =>
      prev.map((brand) =>
        brand.id === id ? { ...brand, active: !brand.active } : brand,
      ),
    );
  };

  return (
    <View>
      <View>
        {renderTitleFilter({
          title: "Situação do carregador",
          description: "Selecione uma ou mais situações",
          iconName: "BatteryCharging",
        })}
      </View>
      <View style={{ marginTop: 16, gap: 8 }}>
        <CardFilter
          label="Disponivel"
          type="SUCCESS"
          count={0}
          onPress={() => setAvailable((prev) => !prev)}
          isActive={available}
        />
        <CardFilter
          label="Ocupado"
          type="WARNING"
          count={0}
          onPress={() => setOccupied((prev) => !prev)}
          isActive={occupied}
        />

        <CardFilter
          label="Indisponível"
          type="ERROR"
          count={0}
          onPress={() => setUnavailable((prev) => !prev)}
          isActive={unavailable}
        />
      </View>
      <View style={{ marginTop: 16 }}>
        {renderTitleFilter({
          title: "Distância máxima",
          description: "A partir da sua localização",
          iconName: "Ruler",
        })}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {renderSeekValue("Sem limite")}
        <Seek
          value={valueKm}
          onChange={setValueKm}
          min={SEEK_MIN_KM}
          max={SEEK_MAX_KM}
          w={280}
        />
        {renderSeekLabel({ min: "0 km", value: labelSeekKm })}
      </View>
      <View style={{ marginTop: 16 }}>
        {renderTitleFilter({
          title: "Potência mínima",
          description: "Filtre por potência do carregador",
          iconName: "Gauge",
        })}
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        {renderSeekValue("Todas")}
        <Seek
          value={valueKw}
          onChange={setValueKw}
          min={SEEK_MIN_KW}
          max={SEEK_MAX_KW}
          w={280}
        />
        {renderSeekLabel({ min: "Todas", value: labelSeekKw })}
      </View>
      <View style={{ marginTop: 30 }}>
        {renderTitleFilter({
          title: "Marca da estação",
          description: "Selecione uma ou mais marcas",
          iconName: "Ruler",
        })}
      </View>
      <ScrollView
        style={{ marginTop: 14 }}
        horizontal
        contentContainerStyle={{ gap: 8 }}
        showsHorizontalScrollIndicator={false}
      >
        {brands.map((item) => (
          <View key={item.id}>
            <CardBrand
              label={item.name}
              indexColor={item.id}
              count={item.station}
              isActive={item.active}
              uri={item.uri}
              onPress={() => handleClickBrand(item.id)}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
