import { C } from "@/src/theme";
import { View } from "react-native";
import Icon from "../Icon";
import { MaskedTabBar } from "../shared/ui/organisms/masked-tab-bar";
import { TabNavigationProps } from "./TabNavigationDTO";
import { tabNavigationStyles } from "./styles";

const TabNavigation = ({ items, onPress, value }: TabNavigationProps) => {
  return (
    <View>
      <View style={tabNavigationStyles.center}>
        <MaskedTabBar
          value={value}
          onValueChange={onPress}
          radius={99}
          style={tabNavigationStyles.bar}
          palette={{
            pill: C.ink100,
            active: C.brand500,
            inactive: C.ink500,
          }}
        >
          <MaskedTabBar.List>
            {items.map(({ value, label, icon }) => (
              <MaskedTabBar.Trigger key={value} value={value}>
                <MaskedTabBar.Icon>
                  {({ color, size, active }) => (
                    <Icon
                      name={icon}
                      fill={active ? C.brand500 : "transparent"}
                      size={size}
                      color={color}
                    />
                  )}
                </MaskedTabBar.Icon>
                <MaskedTabBar.Label>{label}</MaskedTabBar.Label>
              </MaskedTabBar.Trigger>
            ))}
          </MaskedTabBar.List>
        </MaskedTabBar>
      </View>
    </View>
  );
};

export default TabNavigation;
