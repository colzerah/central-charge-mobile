import { C } from "@/src/theme";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../Input";
import {
  ScrollableSearch,
  useScrollableSearch,
} from "../shared/ui/base/scrollable-search";
import { SearchBarProps } from "./SearchBarDTO";

const SearchBar = ({}: SearchBarProps) => {
  const { setIsFocused, isFocused } = useScrollableSearch();
  return (
    <ScrollableSearch.AnimatedComponent
      onPullToFocus={() => setIsFocused(true)}
      focusedOffset={-70}
      unfocusedOffset={-30}
    >
      <></>
    </ScrollableSearch.AnimatedComponent>
  );
};

export const Content = ({
  onPress,
  items,
  onChange,
  value,
  placeholder,
  subtitle = "Pesquise pelo nome",
  focusedOffset = -70,
  unfocusedOffset = -30,
}: {
  onPress: (param: any) => void;
  onChange: (param: string) => void;
  items: string[];
  value: string;
  placeholder?: string;
  subtitle?: string;
  focusedOffset?: number;
  unfocusedOffset?: number;
}) => {
  const { setIsFocused, isFocused } = useScrollableSearch();

  return (
    <>
      <ScrollableSearch.AnimatedComponent
        onPullToFocus={() => setIsFocused(true)}
        focusedOffset={focusedOffset}
        unfocusedOffset={unfocusedOffset}
      >
        <View style={styles.searchBar}>
          <Input
            value={value}
            leftIcon="Search"
            onFocus={() => setIsFocused(!isFocused)}
            onChange={onChange}
            placeholder={placeholder}
          />
        </View>
      </ScrollableSearch.AnimatedComponent>
      <ScrollableSearch.Overlay
        onPress={() => {
          setIsFocused(false);
          onChange("");
        }}
      >
        <ScrollableSearch.FocusedScreen>
          <SafeAreaView edges={["top"]} style={styles.focusedContainer}>
            <ScrollView
              style={styles.focusedScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.focusedSection}>
                <View style={styles.focusedHeader}>
                  <SymbolView
                    name="clock.fill"
                    size={16}
                    tintColor={C.surface}
                  />
                  <Text
                    style={[
                      styles.focusedTitle,
                      // fontLoaded && { fontFamily: "SfProRounded" },
                    ]}
                  >
                    {subtitle}
                  </Text>
                </View>

                {items.map((item, index) => (
                  <Pressable
                    key={index}
                    style={styles.recentItem}
                    onPress={() => onPress(item)}
                  >
                    <SymbolView
                      name="magnifyingglass"
                      size={16}
                      tintColor="#666"
                    />
                    <Text
                      style={[
                        styles.recentText,
                        // fontLoaded && { fontFamily: "SfProRounded" },
                      ]}
                    >
                      {item}
                    </Text>
                    <SymbolView
                      name="arrow.up.left"
                      size={14}
                      tintColor="#444"
                    />
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </ScrollableSearch.FocusedScreen>
      </ScrollableSearch.Overlay>

      <SearchBar />
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 28,
    bottom: 60,
  },
  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
  },
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    gap: 14,
  },
  cardIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#252525",
    justifyContent: "center",
    alignItems: "center",
  },
  cardContent: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  searchBar: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    marginHorizontal: 20,
  },
  searchPlaceholder: {
    flex: 1,
    fontSize: 16,
    color: "#555",
  },
  focusedContainer: {
    flex: 1,
  },
  focusedScroll: {
    flex: 1,
    paddingTop: 90,
  },
  focusedSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  focusedHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  focusedTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: C.surface,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    gap: 12,
    borderWidth: 1,
    borderColor: "#252525",
  },
  recentText: {
    flex: 1,
    fontSize: 15,
    color: "#fff",
  },
  tipCard: {
    flexDirection: "row",
    backgroundColor: "rgba(167, 139, 250, 0.1)",
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 14,
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(167, 139, 250, 0.2)",
  },
  tipContent: {
    flex: 1,
    gap: 2,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a78bfa",
  },
  tipText: {
    fontSize: 13,
    color: "#888",
  },
});
