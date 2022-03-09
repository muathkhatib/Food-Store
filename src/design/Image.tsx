/* eslint-disable import/namespace */
import { View, Text, ActivityIndicator, Image as RNImage } from "react-native";
import React, { useState } from "react";

// import notFound from "../../assets/media/noimage.png";÷
const notFound = require("../../assets/media/noimage.png");

interface ImageProps {
  width?: number;
  height?: number;
  uri?: any;
  style?: object;
  resizeMethod?: string;
}

const BasedUrl = notFound;

const Image = ({
  width = 100,
  height = 100,
  uri = BasedUrl,
  style,
}: ImageProps) => {
  const [isLoading, setLoding] = useState(true);
  const [error, setIsError] = useState(false);

  return (
    <View>
      {isLoading && !error && (
        <ActivityIndicator
          color="#970810"
          style={{
            position: "absolute",
            top: height / 2 - 10,
            left: width / 2 - 10,
          }}
        />
      )}
      <RNImage
        onLoadStart={() => setLoding(true)}
        onLoadEnd={() => setLoding(false)}
        onError={() => setIsError(true)}
        source={typeof uri === "string" ? { uri: error ? BasedUrl : uri } : uri}
        width={width}
        height={height}
        style={[{ height, width }, style]}
      />
    </View>
  );
};

export default Image;
