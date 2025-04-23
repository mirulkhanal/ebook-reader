import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: { backgroundColor: "#25292e" },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="books"
        options={{
          title: "BookShelf",
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={focused ? "book-sharp" : "book-outline"}
                color={color}
                size={24}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ focused, color }) => {
            return (
              <Ionicons
                name={
                  focused
                    ? "information-circle-sharp"
                    : "information-circle-outline"
                }
                color={color}
                size={24}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
