import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  TouchableHighlightComponent,
  TouchableHighlightBase,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import categories from "../constants/data/categories";
import productsData from "../constants/data/products";
import Image from "../design/Image";
import { AntDesign } from "@expo/vector-icons";

import { Rating } from "react-native-ratings";

import { useNavigation } from "@react-navigation/native";

const resturant = require("../../assets/media/london-stock.jpeg");
const notifications = 2;

const TabOneScreen = () => {
  const [selected, setSelected] = useState(1);
  const [filterdData, setFilteredData] = useState(productsData);
  const [products, setProducts] = useState(productsData);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "700" }}>
          What would you like to eat ?
        </Text>

        <TouchableOpacity onPress={() => console.log("dsd")}>
          <View
            style={{
              position: "absolute",
              bottom: 15,
              right: 10,
              width: 20,
              height: 20,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: Dimensions.get("window").width / 2,
              backgroundColor: "#FE0100",
              zIndex: 1,
            }}
          >
            <Text style={{ fontWeight: "700", color: "#FFF" }}>
              {notifications}
            </Text>
          </View>
          <Feather name="bell" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.categoriesContainer}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={categories}
          horizontal
          renderItem={({ item }) => (
            <>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  console.log(item);
                  setFilteredData(products.filter((p) => p.id === item.id));
                }}
              >
                <View
                  style={{
                    backgroundColor: "#fff",
                    padding: 8,
                    marginBottom: 16,
                    borderWidth: 1,
                    borderColor: "#ddd",
                    borderRadius: 8,
                  }}
                >
                  <Image uri={item.image} width={52} height={52} />
                </View>
                <View>
                  <Text style={{ fontWeight: "700", color: "#242424" }}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
        />
      </View>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {filterdData.map((item, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ProductScreen", { item })}
            key={Math.random()}
            style={{
              borderWidth: 1,
              width: Dimensions.get("window").width / 2 - 20,
              height: 200,
              margin: 8,
              borderRadius: 8,
              borderColor: "#ddd",
              overflow: "hidden",
            }}
          >
            <View>
              <Image
                uri={item.images[0]}
                width={Dimensions.get("window").width / 2 - 20}
                height={140}
              />
              <TouchableOpacity
                onPress={() =>
                  //@ts-ignore
                  setProducts((c) => {
                    return [
                      ...c,
                      (products[index].favorated = !products[index].favorated),
                    ];
                  })
                }
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: 4,
                  right: 4,
                }}
              >
                <AntDesign
                  name={item.favorated ? "hearto" : "heart"}
                  size={20}
                  color={item.favorated ? "lightgray" : "red"}
                />
              </TouchableOpacity>
            </View>
            <View style={{ padding: 8 }}>
              <Text style={{ fontWeight: "700", color: "#242424" }}>
                {item.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 8,
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#888888",
                      fontWeight: "300",
                      fontSize: 12,
                    }}
                  >
                    {item.rate}
                  </Text>
                  <Rating
                    type="custom"
                    ratingColor="#FE0100"
                    ratingBackgroundColor="lightgray"
                    ratingCount={5}
                    imageSize={14}
                    onFinishRating={(e: number) => console.log("rating", e)}
                    jumpValue={1}
                    startingValue={item.rate}
                    style={{ marginHorizontal: 4 }}
                  />
                  <Text
                    style={{
                      color: "#888888",
                      fontWeight: "300",
                      fontSize: 12,
                    }}
                  >
                    ({item.ratesNumber})
                  </Text>
                </View>
                <Text
                  style={{ color: "#242424", fontWeight: "700", fontSize: 12 }}
                >
                  {" "}
                  ${item.price}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    marginTop: 16,
  },
  categoriesContainer: {
    marginTop: 16,
  },
  item: {
    marginRight: 20,
    width: 80,
    shadowColor: "#000",
    elevation: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "space-between",
    alignItems: "center",
  },
  restaurant: {
    flexDirection: "row",
    marginBottom: 16,
  },
  restaurantInfo: {
    flex: 1,
    marginLeft: 16,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#242424",
  },
  restaurantNameBold: {
    fontWeight: "700",
  },
  restaurantDescription: {
    fontSize: 16,
    color: "#737380",
    marginTop: 8,
  },
  restaurantsContainer: {
    marginTop: 16,
  },
  icon: {
    width: 14,
    height: 14,
  },
});

export default TabOneScreen;
