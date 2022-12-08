import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  NativeSyntheticEvent,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from "react-native";
import Background from "../../components/Background";
import Modal from "../../components/Modal";
import SearchCity from "../../components/SearchCity";
import { useCity } from "../../context/cityContext";
import { useTheme } from "../../context/themeContext";
import weather from "../../services/weather";
import { getDataFromStore } from "../../storage";

export default () => {
  const { theme } = useTheme();
  const [cities, setCities] = useState([]);
  const [weathers, setWeathers] = useState<any[]>([]);

  const style = styles(theme);

  useEffect(() => {
    getDataFromStore("cities").then((data: any) => {
      setCities(JSON.parse(data));
    });
  }, []);

  const generateMaps = useEffect(() => {
    cities.map((city: any) => {
      if (city?.lat) {
        return weather({
          method: "GET",
          url: "data/2.5/weather",
          params: {
            lat: city?.lat,
            lon: city?.lon,
          },
        })
          .then((res) => {
            const weather = res.data;

            const temp = Math.ceil(Number(weather?.main?.temp));
            weather.temp = temp;
            weather.city = city;

            if (!weathers.find((w) => w?.id === weather?.id))
              setWeathers([...weathers, weather]);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });
  });

  return (
    <Background>
      <View style={style.container}>
        <StatusBar style="auto" />

        <View
          style={{
            width: Dimensions.get("window").width,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 1,
            flexDirection: "column",
          }}
        >
          {weathers.map((weather, i) => {
            return (
              <Text key={i}>{`${weather?.city?.display_name?.split(",")[0]} - ${
                weather?.weather[0]?.description
              } - ${weather?.temp}°C`}</Text>
            );
          })}
        </View>
        <Modal />
      </View>
    </Background>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
      width: Dimensions.get("window").width,
    },
    text: {
      color: theme.colors.primary,
    },
  });
