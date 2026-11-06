import { C } from "@/src/theme";
import { View } from "react-native";
import { GooeySwitch } from "../shared/ui/micro-interactions/gooey-switch";
import { SwitchDTO } from "./SwitchDTO";

const Switch = ({
  isActive,
  size = 50,
  gooeySize = 35,
  onToggle,
}: SwitchDTO) => {
  return (
    <View>
      <GooeySwitch
        activeColor={C.brand500}
        inactiveColor={C.ink500}
        trackColor={C.ink300}
        size={size}
        gooey={gooeySize}
        deformation={{
          squishY: 0.5,
          stretchX: 1.2,
        }}
        active={isActive}
        onToggle={onToggle}
      />
    </View>
  );
};

export default Switch;
