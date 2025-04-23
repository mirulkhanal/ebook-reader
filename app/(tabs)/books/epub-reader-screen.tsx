import { Reader, ReaderProvider, Themes } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/expo-file-system";
import { useLocalSearchParams } from "expo-router";
import { Dimensions, View, StyleSheet } from "react-native";

export default function EpubReaderScreen({ uri }: { uri: string }) {
  const { width, height } = Dimensions.get("window");

  const { item } = useLocalSearchParams();
  console.log("ITEM SEND IN THE ROUTE PARAMS: ", item);
  return (
    <View style={styles.container}>
      <ReaderProvider>
        {typeof item === "string" && (
          <Reader
            src={item}
            flow="paginated"
            width={width}
            height={height}
            fileSystem={useFileSystem}
          />
        )}
      </ReaderProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
});
