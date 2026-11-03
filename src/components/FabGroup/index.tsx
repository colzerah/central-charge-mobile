import { C } from "@/src/theme";
import { EMPTY_ITEM_FAB_GROUP } from "@/src/utils/enum";
import { useState } from "react";
import { View } from "react-native";
import Icon from "../Icon";
import GooeyPopover from "../shared/ui/molecules/gooey-popover";
import MorphFab from "../shared/ui/molecules/morph-fab";
import { FabGroupProps, FabItems } from "./FabGroupDTO";
import { fabGroupStyles } from "./styles";

const FabGroup = ({
  direction,
  items = EMPTY_ITEM_FAB_GROUP,
}: FabGroupProps) => {
  // value do item cujo popover está aberto (só um por vez)
  const [openPopover, setOpenPopover] = useState<string | null>(null);

  const handleSelect = (item: FabItems) => {
    if (item.popover) {
      setOpenPopover((current) => (current === item.value ? null : item.value));
      return;
    }
    item.onPress?.();
  };

  return (
    <View style={fabGroupStyles.center}>
      <MorphFab.Root
        gooStrength={9}
        direction={direction}
        spacing={18}
        color={C.brand500}
        closeOnSelect={false}
        dismissOnOutsidePress={false}
        // fechar o grupo fecha junto o popover que estiver aberto
        onOpenChange={(open) => {
          if (!open) setOpenPopover(null);
        }}
      >
        <MorphFab.Trigger size={62} style={fabGroupStyles.trigger}>
          <Icon name="Plus" size={25} color={C.brand500} />
        </MorphFab.Trigger>
        {items.map((item) => (
          <MorphFab.Item
            key={item.value}
            value={item.value}
            onSelect={() => handleSelect(item)}
            style={fabGroupStyles.trigger}
          >
            <MorphFab.ItemIcon>
              {item.popover ? (
                // Abre para cima e alinhado à direita, porque o grupo fica
                // no canto direito da tela
                <GooeyPopover
                  open={openPopover === item.value}
                  onOpenChange={(open) =>
                    setOpenPopover(open ? item.value : null)
                  }
                  side="top"
                  align="end"
                  color={C.ink100}
                >
                  <GooeyPopover.Trigger>
                    <Icon name={item.iconName} size={18} color={C.brand500} />
                  </GooeyPopover.Trigger>
                  <GooeyPopover.Content>{item.popover}</GooeyPopover.Content>
                </GooeyPopover>
              ) : (
                <Icon name={item.iconName} size={18} color={C.brand500} />
              )}
            </MorphFab.ItemIcon>
          </MorphFab.Item>
        ))}
      </MorphFab.Root>
    </View>
  );
};

export default FabGroup;
