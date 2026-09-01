import { View } from "react-native";
import { DividerProps } from "./DividerDTO";
import DividerHorizontal from "./DividerHorizontal";
import DividerVertical from "./DividerVertical";

const Divider = ({
  title,
  type = "horizontal",
  mt,
  mb,
  ml,
  mr,
}: DividerProps) => {
  const isVertical = type === "vertical";

  return (
    <View
      style={
        isVertical
          ? { width: 1, height: "100%", marginLeft: ml, marginRight: mr }
          : { width: "100%" }
      }
    >
      {isVertical ? (
        <DividerVertical />
      ) : (
        <DividerHorizontal title={title} mt={mt} mb={mb} />
      )}
    </View>
    // <View
    //   style={[
    //     dividerStyles.dividerRow,
    //     isVertical && dividerStyles.dividerColumn,
    //     { marginTop: mt, marginBottom: mb },
    //   ]}
    // >
    //   <View
    //     style={[
    //       dividerStyles.divider,
    //       isVertical && dividerStyles.dividerVertical,
    //     ]}
    //   />
    //   {title && !isVertical && (
    //     <Text style={dividerStyles.dividerText}>{title}</Text>
    //   )}
    //   <View
    //     style={[
    //       dividerStyles.divider,
    //       isVertical && dividerStyles.dividerVertical,
    //     ]}
    //   />
    // </View>
  );
};

export default Divider;
