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
  h,
}: DividerProps) => {
  const isVertical = type === "vertical";

  return (
    <View
      style={
        isVertical
          ? { width: 1, marginLeft: ml, marginRight: mr }
          : { width: "100%" }
      }
    >
      {isVertical ? (
        <DividerVertical h={h} />
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
