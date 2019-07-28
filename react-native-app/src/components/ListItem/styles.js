import { StyleSheet, Dimensions } from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  containerItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 10,
    marginTop: 20,
    width: DIMENSION_WIDTH - 20
  },
  image: {
    borderRadius: 30,
    width: 60,
    height: 60,
    marginRight: 20,
    marginVertical: 15
  },
  title: {
    fontWeight: "bold",
    fontSize: 15
  },
  info: {
    color: "#757E90",
    fontSize: 12,
    paddingTop: 5
  }
});
