import { C } from "@/src/theme";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScreenHeaderProps } from "./HeaderDTO";
import { headerStyles } from "./styles";

function Header({ title, subtitle, onBack, right }: ScreenHeaderProps) {
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBack) onBack();
    else router.back();
  };

  return (
    <View
      style={[
        headerStyles.header,
        { paddingTop: insets.top > 0 ? insets.top + 6 : 14 },
      ]}
    >
      <View style={headerStyles.headerRow}>
        <TouchableOpacity
          style={headerStyles.backBtn}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <ChevronLeft color={C.white} size={22} strokeWidth={2.4} />
        </TouchableOpacity>

        <View style={headerStyles.titleWrap}>
          <Text style={headerStyles.title}>{title}</Text>
          {subtitle ? (
            <Text style={headerStyles.subtitle}>{subtitle}</Text>
          ) : null}
        </View>

        <View style={headerStyles.rightSlot}>
          {right ?? <View style={headerStyles.rightPlaceholder} />}
        </View>
      </View>
    </View>
  );
}

export default Header;
