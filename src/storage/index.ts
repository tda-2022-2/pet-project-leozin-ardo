import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key: string, value: string | object) => {
  let valueToStore: string;

  try {
    if (typeof value === "object") valueToStore = JSON.stringify(value);
    else valueToStore = value;

    await AsyncStorage.setItem(key, valueToStore);
    console.log("salvo com sucesso!");
  } catch (err) {
    console.log(err);
  }
};

export const getDataFromStore = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (err) {
    console.log(err);
  }
};
