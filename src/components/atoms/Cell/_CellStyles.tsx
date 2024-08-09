import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    cell: {
      width: 15,
      height: 15,
      margin: 1,
    },
    liveCell: {
      backgroundColor: 'black',
    },
    deadCell: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderColor: 'gray',
    },
  });

export default styles  