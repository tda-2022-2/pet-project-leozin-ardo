import React from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import Search from "../../assets/icons/search.svg";
import { useCity } from "../../context/cityContext";
import { useTheme } from "../../context/themeContext";
import { searchCityByCep } from "../../services/location";
import { getDataFromStore, storeData } from "../../storage";
import { useEffect } from "react";

export default ({ closeModal }: any) => {
  const [cities, setCities] = React.useState<any[]>([]);

  const [cep, setCep] = React.useState("");
  const [error, setError] = React.useState("");

  const { theme } = useTheme();
  const { setNewCity } = useCity();
  const style = styles(theme);

  useEffect(() => {
    getDataFromStore("cities").then((data: any) => {
      setCities(JSON.parse(data));
    });
  }, []);

  const verifyInput = (cep: string) => {
    if (!/\d{5}\-\d{3}/gm.test(cep)) return setError("Digite um CEP válido");
    setError("");
  };

  const inputCep = (cep: string) => {
    if (cep.replace(/\-/gm, "").length === 8) {
      setCep(cep.replace(/(\d{5})(\d{3})/gm, "$1-$2"));
    } else {
      setCep(cep.replace(/\-/gm, ""));
    }
  };

  const confirmCep = () =>
    searchCityByCep(cep)
      .then(([data]: any) => {
        setNewCity(data);
        cities.push( data);
        console.log(cities);

        closeModal(false);

        storeData("cities", [...cities, data]).then((success) => {});
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });

  return (
    <View style={style.container}>
      <View style={style.inputCityBox}>
        <TextInput
          style={{
            textAlign: "center",
            flex: 0.9,
            color: theme.colors.text,
          }}
          placeholder="Digite o cep da cidade"
          onChangeText={(e) => inputCep(e)}
          value={cep}
          onSubmitEditing={() => verifyInput(cep)}
        />
        <Search width={30} height={30} fill={theme.colors.text} />
      </View>
      <View>
        {error !== "" ? <Text style={style.error}>{error}</Text> : false}
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: theme.colors?.buttonPrimary,
          padding: 10,
          borderRadius: 50,
        }}
        disabled={cep.length !== 9 ? true : false}
        onPress={confirmCep}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Confirmar localização
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    container: {
      alignItems: "center",
      justifyContent: "space-between",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height / 1.2,
      flexDirection: "column",
    },
    inputCityBox: {
      flexDirection: "row",
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      borderColor: theme.colors.text,
      borderRadius: 50,
      paddingHorizontal: 5,
    },
    text: {
      color: theme.colors.primary,
    },
    citiesDisplay: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.buttonPrimary,
    },
    citiesText: {
      fontSize: 20,
      color: theme.colors.text,
    },
    error: {
      marginTop: 5,
      fontSize: 14,
      color: "#ff3333",
      fontWeight: "300",
    },
  });
