import { Dimensions, StatusBar, StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import MapView from "react-native-maps";

import * as Location from 'expo-location';

export default function TabFourScreen() {
  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <MapView style={styles.map} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
