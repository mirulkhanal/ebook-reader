import { View, StyleSheet } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import { ImageSource } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiSticker from "@/components/EmojiSticker";
import { usePermissions, saveToLibraryAsync } from "expo-media-library";
import { captureRef } from "react-native-view-shot";

const placeholderImage = require("../../assets/images/background-image.png");
export default function Index() {
  const [selectedImage, setSelectedImage] = useState(placeholderImage);
  const [menu, setMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>();
  const imageRef = useRef<View>(null);

  const [status, requestPermission] = usePermissions();

  if (status == null) {
    requestPermission();
  }
  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setMenu(true);
    } else {
      alert("You did not select any image");
    }
  };

  const onReset = () => {
    setMenu(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUrl = await captureRef(imageRef, { height: 440, quality: 1 });
      await saveToLibraryAsync(localUrl);
      if (localUrl) {
        alert("Saved successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const onAddSticker = () => {
    setShowModal(true);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer imgSource={selectedImage} />
          {pickedEmoji && (
            <EmojiSticker stickerSource={pickedEmoji} imageSize={40} />
          )}
        </View>
      </View>

      {menu ? (
        <View style={styles.menuContainer}>
          <View style={styles.menuRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button label="Use this photo" onPress={() => setMenu(true)} />
        </View>
      )}
      <EmojiPicker isVisible={showModal} onClose={closeModal}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={closeModal} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
  },
  textbox: {
    color: "white",
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  menuContainer: {
    position: "absolute",
    bottom: 80,
  },
  menuRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
