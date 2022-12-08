import { NativeSyntheticEvent, TextInputChangeEventData } from "react-native";

export default (
  event: NativeSyntheticEvent<TextInputChangeEventData>,
  setState: React.Dispatch<React.SetStateAction<any>>
) => {
  event.preventDefault();
  setState(event.nativeEvent.text);
};
