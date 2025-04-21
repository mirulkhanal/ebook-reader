import { StyleSheet, Text, View } from "react-native";
import { Link, Stack } from "expo-router";

const NotFoundComponent = (props: Props) => {
  return (
    <>
      <Stack.Screen options={{ title: "Oops Not Found!!" }} />
      <View>
        <Text>Component not found. Go Back to</Text>
        <Link href="/"> Home </Link>
      </View>
    </>
  );
};

export default NotFoundComponent;

const styles = StyleSheet.create({});
