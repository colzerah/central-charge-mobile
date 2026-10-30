import { C } from "@/src/theme";
import { EMPTY_ITEM_FAB_GROUP } from "@/src/utils/enum";
import { View } from "react-native";
import Icon from "../Icon";
import MorphFab from "../shared/ui/molecules/morph-fab";
import { FabGroupProps } from "./FabGroupDTO";
import { fabGroupStyles } from "./styles";

const FabGroup = ({
  direction,
  items = EMPTY_ITEM_FAB_GROUP,
}: FabGroupProps) => {
  return (
    <View style={fabGroupStyles.center}>
      <MorphFab.Root
        gooStrength={9}
        direction={direction}
        spacing={18}
        color={C.brand500}
        closeOnSelect={false}
        dismissOnOutsidePress={false}
      >
        <MorphFab.Trigger size={62} style={fabGroupStyles.trigger}>
          <Icon name="Plus" size={25} color={C.brand500} />
        </MorphFab.Trigger>
        {items.map((item) => (
          <MorphFab.Item
            key={item.value}
            value={item.value}
            onSelect={() => item.onPress()}
            style={fabGroupStyles.trigger}
          >
            <MorphFab.ItemIcon>
              <Icon name={item.iconName} size={18} color={C.brand500} />
            </MorphFab.ItemIcon>
          </MorphFab.Item>
        ))}
      </MorphFab.Root>
    </View>
  );
};

export default FabGroup;
