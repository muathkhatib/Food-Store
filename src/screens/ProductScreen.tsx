import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useReducer, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Carousel, { Pagination } from "react-native-snap-carousel";
import Image from "../design/Image";
import { Rating } from "react-native-ratings";
import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  EvilIcons,
  Feather,
  Ionicons,
} from "@expo/vector-icons";
import GradientButton from "../design/GradientButton";
import { useNavigation } from "@react-navigation/native";

const chickenPlate = require("../../assets/media/sushi_plate.jpeg");
const ffsdf = require("../../assets/media/drink.webp");
const fdfdc = require("../../assets/media/chicken_plate.webp");

export const SLIDER_WIDTH = Dimensions.get("window").width + 30;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.8);

const data = {
  id: 1,
  name: "Grilled Salamon",
  rate: 2.5,
  ratesNumber: 200,
  price: 960,
  categoryId: 1,
  favorated: true,
  images: [chickenPlate, ffsdf, fdfdc],
  resturantName: "Sushi Restaurant",
};

const ProductScreen = (item: { item: any }) => {
  console.log(item);
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const [count, setCount] = useState(0);
  const navigation = useNavigation();

  const renderItem = (data: any) => {
    return (
      <View
        style={{
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        {console.log(data.item)}
        <Image uri={data.item} style={{ width: 270, height: 210 }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          justifyContent: "space-between",
          width: Dimensions.get("screen").width,
          paddingHorizontal: 10,
          paddingVertical: 24,
          zIndex: 1,
        }}
      >
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => navigation.goBack()}
        >
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconContainer}>
          <Ionicons name="ios-cart" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.carousel}>
        <Carousel
          ref={isCarousel}
          data={data.images}
          renderItem={renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={(index) => setIndex(index)}
          //@ts-ignore
          carouselRef={isCarousel}
        />
      </View>
      <View style={{ position: "absolute", right: 24, top: 220 }}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={data.favorated ? "heart" : "hearto"}
            size={20}
            color="red"
          />
        </View>
        <View style={styles.iconContainer}>
          <FontAwesome name="location-arrow" size={24} color="red" />
        </View>
      </View>
      <ScrollView style={styles.info}>
        <View>
          <Pagination
            dotsLength={data.images.length}
            activeDotIndex={index}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: "#f00",
            }}
            tappableDots={true}
            inactiveDotStyle={{
              backgroundColor: "black",
              // Define styles for inactive dots here
            }}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text style={styles.name}>{data.name}</Text>
            <Text style={{ color: "#777", marginVertical: 8 }}>
              By: {data.resturantName}
            </Text>
          </View>
          <Text style={styles.price}>$ {data.price}</Text>
        </View>

        <Rating
          type="custom"
          ratingColor="#FE0100"
          ratingBackgroundColor="lightgray"
          ratingCount={5}
          imageSize={20}
          onFinishRating={(e: number) => console.log("rating", e)}
          jumpValue={1}
          startingValue={data.rate}
          style={{ marginHorizontal: 4 }}
        />
        {/* Add to cart */}
        <View
          style={{
            marginTop: 32,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View style={styles.iconContainer}>
            <AntDesign name="minuscircleo" size={24} color="black" />
          </View>
          <GradientButton
            text="Add to cart"
            onPress={() => console.log("1232")}
          />

          <View style={styles.iconContainer}>
            <AntDesign name="pluscircleo" size={24} color="black" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  carousel: {},
  info: {
    flex: 1,
    margin: 20,
    backgroundColor: "transparent",
    borderWidth: 0.5,
    borderColor: "lightgray",
    borderRadius: 8,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  price: {
    fontSize: 20,
    fontWeight: "600",
    color: "#242424",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: Dimensions.get("window").width / 2, 
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "#fff",
  },
});
