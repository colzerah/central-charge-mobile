import { C } from "@/src/theme";
import { useNavigation } from "expo-router";
import { useEffect } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";
import { Drawer } from "react-native-drawer-layout";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Button from "../Button";
import ButtonIcon from "../ButtonIcon";
import { DrawerFilterProps } from "./DrawerFilterDTO";
import { drawerFilterStyles } from "./styles";

const PANEL_PADDING = 20;

const DrawerFilter = ({
  open,
  onClose,
  onApply,
  onClear,
  title = "Filtros",
  content,
  children,
}: DrawerFilterProps) => {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const drawerWidth = Math.min(width * 0.85, 360);
  const buttonWidth = drawerWidth - PANEL_PADDING * 2;
  const navigation = useNavigation();

  // The bottom tab bar is drawn by the tabs layout, above this screen, so the
  // panel can't cover it: hide it while the drawer is open.
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: open ? { display: "none" } : undefined,
    });
  }, [navigation, open]);

  return (
    <Drawer
      open={open}
      onOpen={() => {}}
      onClose={onClose}
      drawerPosition="right"
      drawerType="front"
      swipeEnabled={false}
      drawerStyle={[drawerFilterStyles.drawer, { width: drawerWidth }]}
      overlayStyle={drawerFilterStyles.overlay}
      renderDrawerContent={() => (
        <View
          style={[
            drawerFilterStyles.panel,
            { paddingTop: insets.top + 12, paddingBottom: insets.bottom + 12 },
          ]}
        >
          <View style={drawerFilterStyles.header}>
            <View style={drawerFilterStyles.viewTitle}>
              <ButtonIcon
                icon="SlidersHorizontal"
                size="sm"
                variant="outline"
                border
                borderColor={C.brand400}
                borderW={2}
              />
              <Text style={drawerFilterStyles.title}>{title}</Text>
            </View>
            <ButtonIcon
              icon="X"
              size="sm"
              variant="outline"
              onPress={onClose}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={drawerFilterStyles.content}
          >
            {content}
          </ScrollView>

          <View style={drawerFilterStyles.footer}>
            <Button title="Aplicar" w={buttonWidth} onPress={onApply} />
            {onClear && (
              <Button title="Limpar filtros" variant="link" onPress={onClear} />
            )}
          </View>
        </View>
      )}
    >
      {children}
    </Drawer>
  );
};

export default DrawerFilter;
