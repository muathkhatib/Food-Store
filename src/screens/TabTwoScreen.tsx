import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MapView, { Marker, Polyline } from "react-native-maps";
import { point } from "@turf/helpers";
import destination from "@turf/destination";
import * as Location from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import Image from "../design/Image";
export default function TabTwoScreen() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [south, setSouth] = useState<number>(0);
  const [east, setEast] = useState<number>(0);
  const [west, setWest] = useState<number>(0);
  const [north, setNorth] = useState<number>(0);
  const [elements, setElements] = useState<any>([]);
  const [location, setLocation] = useState<any>({});

  const updateState = (location: any) => {
    console.log(location);
    setLocation(location);
    setLatitude(location.coords.latitude);
    setLongitude(location.coords.longitude);
  };

  useEffect(() => {
    const getPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        let location = await Location.getCurrentPositionAsync();
        // console.log(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        updateState(location);
      } catch (error) {
        console.log(error);
      }
    };
    getPermission();
  }, []);

  // async componentDidMount() {
  //   try {
  //     let { status } = await Location.requestPermissionsAsync();
  //     if (status !== 'granted') {
  //       return;
  //     }
  //     let location = await Location.getCurrentPositionAsync({});
  //     this.updateState(location);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  console.log(latitude, longitude);
  const onRegionChangeComplete = (region: any) => {
    const center = point([region.longitude, region.latitude]);
    const verticalMeter = (111 * region.latitudeDelta) / 2;
    const horizontalMeter = (111 * region.longitudeDelta) / 2;
    const options: { units?: any } = { units: "kilometers" };
    const south = destination(center, verticalMeter, 180, options);
    const west = destination(center, horizontalMeter, -90, options);
    const north = destination(center, verticalMeter, 0, options);
    const east = destination(center, horizontalMeter, 90, options);
    setSouth(south.geometry.coordinates[1]);
    setWest(west.geometry.coordinates[0]);
    setNorth(north.geometry.coordinates[1]);
    setEast(east.geometry.coordinates[0]);
  };

  const fetchToilet = async () => {
    const body = `
            [out:json];
            (
                node
                [amenity=kindergarten]
                (${south},${west},${north},${east});

            );
            out;
            `;

    const options = {
      method: "POST",
      body: body,
    };

    try {
      const response = await fetch(
        "https://z.overpass-api.de/api/interpreter",
        options
      );
      const json = await response.json();
      console.log({ json });
      setElements(json.elements);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        onRegionChangeComplete={onRegionChangeComplete}
        style={styles.mapView}
        showsUserLocation
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitude,
          longitudeDelta: longitude,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: latitude,
          }}
          title="Your Location"
          key={1}
        />
      </MapView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
    // paddingTop: 100,
  },

  mapView: {
    ...StyleSheet.absoluteFillObject,
  },

  buttonContainer: {
    flexDirection: "row",
    marginVertical: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },

  button: {
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,235,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },

  buttonItem: {
    textAlign: "center",
  },
});
