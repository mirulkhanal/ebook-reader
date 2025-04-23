import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";
import { router } from "expo-router";

export default function EpubListScreen() {
  const [epubUris, setEpubUris] = useState<string[]>([]);
  async function requestDirectoryAccess(): Promise<string> {
    const x =
      await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
    if (!x.granted) {
      Alert.alert("Permission required", "Storage access was denied.");
      throw new Error("Storage permission denied");
    }
    return x.directoryUri;
  }

  async function listEpubsInFolder(directoryUri: string): Promise<string[]> {
    const filenames =
      await FileSystem.StorageAccessFramework.readDirectoryAsync(directoryUri);
    return filenames
      .filter((name) => name.toLowerCase().endsWith(".epub"))
      .map((name) => {
        console.log("Name: ", name);
        return name;
      });
  }
  const storagePermissionOutput = async () => {
    try {
      const dirUri = await requestDirectoryAccess();
      const uris = await listEpubsInFolder(dirUri);
      setEpubUris(uris);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button title="Select EPUB Folder" onPress={storagePermissionOutput} />
      </View>
      <FlatList
        data={epubUris}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              router.push({
                pathname: "/books/epub-reader-screen",
                params: { item },
              })
            }
          >
            <Text>{item.split("/").pop()?.trim()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  item: { padding: 12, borderBottomWidth: 1, borderColor: "#eee" },
});
