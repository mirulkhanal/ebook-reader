import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.textbox}>About this app!!</Text>
      <Link href="/" style={styles.textbox}>
        Return Home
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  textbox: {
    color: "white",
  },
});
