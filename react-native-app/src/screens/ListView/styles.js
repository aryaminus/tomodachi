import { StyleSheet, Dimensions } from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT
  },
  containerLists: {
    justifyContent: "space-between",
    flex: 1
  },
  top: {
    paddingTop: 35,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#3672B9"
  },
  title: {
    marginHorizontal: 10,
    paddingBottom: 10,
    fontSize: 22,
    color: "#fff"
  },
  avatar: {
    marginHorizontal: 10,
    borderRadius: 25,
    width: 40,
    height: 40,
    alignSelf: "center"
  }
});
