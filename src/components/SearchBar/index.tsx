import { C } from "@/src/theme";
import { SymbolView } from "expo-symbols";
import { Pressable, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../Input";
import {
  ScrollableSearch,
  useScrollableSearch,
} from "../shared/ui/base/scrollable-search";
import { SearchBarProps } from "./SearchBarDTO";
import { searchBarStyles } from "./styles";

const SearchBar = ({
  onPress,
  items,
  onChange,
  value,
  placeholder,
  subtitle = "Pesquise pelo nome",
  focusedOffset = -70,
  unfocusedOffset = -30,
  scrollableSearch,
}: SearchBarProps) => {
  const { setIsFocused, isFocused } = useScrollableSearch();
  return (
    <>
      <ScrollableSearch.AnimatedComponent
        onPullToFocus={() => setIsFocused(true)}
        focusedOffset={focusedOffset}
        unfocusedOffset={unfocusedOffset}
      >
        <View style={searchBarStyles.searchBar}>
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
          <SafeAreaView
            edges={["top"]}
            style={searchBarStyles.focusedContainer}
          >
            <ScrollView
              style={searchBarStyles.focusedScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={searchBarStyles.focusedSection}>
                <View style={searchBarStyles.focusedHeader}>
                  <SymbolView
                    name="clock.fill"
                    size={16}
                    tintColor={C.surface}
                  />
                  <Text style={[searchBarStyles.focusedTitle]}>
                    {items.length ? subtitle : "Vazia"}
                  </Text>
                </View>

                {items.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setIsFocused(false);
                      onPress(item);
                      setTimeout(() => {
                        onChange("");
                      }, 500);
                    }}
                    style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
                  >
                    {scrollableSearch(item, index)}
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </SafeAreaView>
        </ScrollableSearch.FocusedScreen>
      </ScrollableSearch.Overlay>
    </>
  );
};

export default SearchBar;
