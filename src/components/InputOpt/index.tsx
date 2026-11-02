import { C } from "@/src/theme";
import { FadeInUp } from "react-native-reanimated";
import OtpInput from "../shared/ui/base/otp-input";
import { InputOptProps } from "./InputOptDTO";

const InputOpt = ({
  error,
  errorMessage = "Código incorreto. Tente novamente.",
  onChange,
  onFinishedChange,
}: InputOptProps) => {
  // const [fontLoaded] = useFonts({
  //   SfProRounded: require("@/assets/fonts/sf-pro-rounded.ttf"),
  //   HelveticaNowDisplay: require("@/assets/fonts/HelveticaNowDisplayMedium.ttf"),
  // });

  return (
    <>
      <OtpInput
        onInputChange={onChange}
        otpCount={6}
        animationVariant="fadeSlideDown"
        focusedBackgroundColor={C.ink50}
        enableAutoFocus={true}
        unfocusedBackgroundColor={C.ink50}
        focusedBorderColor={C.brand300}
        unfocusedBorderColor={C.ink200}
        errorBackgroundColor={C.error + 22}
        errorBorderColor={C.error}
        enteringAnimated={FadeInUp}
        inputBorderRadius={10}
        inputHeight={56}
        inputWidth={48}
        error={error}
        errorMessage={errorMessage}
        textStyle={{
          // fontFamily: fontLoaded ? "HelveticaNowDisplay" : undefined,
          fontSize: 24,
        }}
        onInputFinished={onFinishedChange}
      />
    </>
  );
};

export default InputOpt;
