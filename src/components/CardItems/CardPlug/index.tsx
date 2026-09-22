import CEEBLAU from "@/src/assets/connectors/light/CEE-BLAU.svg";
import CEEROOT from "@/src/assets/connectors/light/CEE-ROOT.svg";
import CHADEMO from "@/src/assets/connectors/light/CHADEMO.svg";
import CSS from "@/src/assets/connectors/light/CSS.svg";
import DOMESTICF from "@/src/assets/connectors/light/DOMESTIC-F.svg";
import TESLAS from "@/src/assets/connectors/light/TESLA-S.svg";
import TYP1CSS from "@/src/assets/connectors/light/TYP1-CSS.svg";
import TYP1 from "@/src/assets/connectors/light/TYP1.svg";
import TYP2 from "@/src/assets/connectors/light/TYP2.svg";

import { C } from "@/src/theme";
import { Text, View } from "react-native";
import { CardPlugProps } from "./CardPlugDTO";

import { useEffect } from "react";
import { cardPlugStyles } from "./styles";

const CardPlug = ({
  title = "ISO 167",
  titleSmall = "CCS",
  titleKw = "60.0 kW",
  plugName = "CSS",
  plugStatus = "AVAILABLE",
}: CardPlugProps) => {
  useEffect(() => {
    console.log("plugName", plugName);
  }, [plugName]);

  const renderSvgIcon = {
    "CEE-BLAU": <CEEBLAU width={35} height={35} fill={C.white} />,
    "CEE-ROOT": <CEEROOT width={35} height={35} fill={C.white} />,
    CHADEMO: <CHADEMO width={35} height={35} fill={C.white} />,
    CSS: <CSS width={35} height={35} fill={C.white} />,
    "DOMESTIC-F": <DOMESTICF width={35} height={35} fill={C.white} />,
    "TESLA-S": <TESLAS width={35} height={35} fill={C.white} />,
    "TYP1-CSS": <TYP1CSS width={35} height={35} fill={C.white} />,
    TYP1: <TYP1 width={35} height={35} fill={C.white} />,
    TYP2: <TYP2 width={35} height={35} fill={C.white} />,
  };

  const getStatusPlugColor = () => {
    if (plugStatus === "BROKEN") return C.error;
    if (plugStatus === "OCCUPIED") return C.warning;
    return C.success;
  };

  //condicao da bolinha verde
  return (
    <View style={cardPlugStyles.container}>
      <View style={cardPlugStyles.viewRowIcon}>
        {renderSvgIcon[plugName]}
        <View
          style={[
            { ...cardPlugStyles.dot },
            { backgroundColor: getStatusPlugColor() },
          ]}
        />
      </View>
      <Text style={cardPlugStyles.titleSmall}>{title}</Text>
      <Text style={cardPlugStyles.title}>{titleSmall}</Text>
      <View style={cardPlugStyles.body}>
        <View style={cardPlugStyles.shadow}>
          <Text style={cardPlugStyles.titleKw}>{titleKw}</Text>
        </View>
      </View>
    </View>
  );
};

export default CardPlug;
