import { C } from "@/src/theme";
import { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  FlatList,
  Pressable,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../Button";
import Icon from "../Icon";
import { OnboardingProps, OnboardingSlide } from "./OnboardingDTO";
import { styles } from "./styles";

const BUTTONS_GAP = 12;
const FOOTER_PADDING = 28;

const Onboarding = ({ slides, onFinish }: OnboardingProps) => {
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<OnboardingSlide>>(null);
  const [index, setIndex] = useState(0);

  const isFirst = index === 0;
  const isLast = index === slides.length - 1;
  const buttonWidth = (width - FOOTER_PADDING * 2 - BUTTONS_GAP) / 2;

  // Atualiza o index na hora em vez de esperar o onMomentumScrollEnd,
  // que no iOS não dispara em scroll feito por código.
  const goTo = (next: number) => {
    listRef.current?.scrollToIndex({ index: next, animated: true });
    setIndex(next);
  };

  const handleNext = () => {
    if (isLast) {
      onFinish();
      return;
    }
    goTo(index + 1);
  };

  // Android: o botão voltar do aparelho volta um slide. No primeiro,
  // retorna false para manter o comportamento padrão (sair do app).
  useEffect(() => {
    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isFirst) return false;
        goTo(index - 1);
        return true;
      },
    );
    return () => subscription.remove();
  }, [index]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {!isLast && (
          <Pressable onPress={onFinish} hitSlop={12}>
            <Text style={styles.skipText}>Pular</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({
          length: width,
          offset: width * i,
          index: i,
        })}
        onMomentumScrollEnd={(e) =>
          setIndex(Math.round(e.nativeEvent.contentOffset.x / width))
        }
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            <View style={styles.iconCircle}>
              <Icon
                name={item.icon}
                size={48}
                color={C.brand400}
                strokeWidth={2}
              />
            </View>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dots}>
          {slides.map((slide, i) => (
            <View
              key={slide.id}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>

        <View style={styles.buttons}>
          {isFirst ? (
            // Ocupa o lugar do "Voltar" para o "Avançar" não mudar de posição
            <View style={{ width: buttonWidth }} />
          ) : (
            <Button
              title="Voltar"
              variant="outline"
              w={buttonWidth}
              iconLeft="ArrowLeft"
              onPress={() => goTo(index - 1)}
            />
          )}
          <Button
            title={isLast ? "Começar" : "Avançar"}
            w={buttonWidth}
            shadowBox
            iconRight={isLast ? "Check" : "ArrowRight"}
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
