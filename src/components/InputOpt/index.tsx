import { useTheme, useThemedStyles } from "@/src/hooks/useTheme";
import { useTranslation } from "@/src/hooks/useTranslation";
import { C } from "@/src/theme";
import { FadeInUp } from "react-native-reanimated";
import OtpInput from "../shared/ui/base/otp-input";
import { InputOptProps } from "./InputOptDTO";

const InputOpt = ({
  error,
  errorMessage,
  onChange,
  onFinishedChange,
}: InputOptProps) => {
  const { colors: C } = useTheme();
  const { t } = useTranslation();
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
        errorMessage={errorMessage ?? t("sendCode.invalidCode") /* pt: "Código incorreto. Tente novamente." */}
        textStyle={{
          fontFamily: "Inter-SemiBold",
          fontSize: 24,
        }}
        onInputFinished={onFinishedChange}
      />
    </>
  );
};

export default InputOpt;
