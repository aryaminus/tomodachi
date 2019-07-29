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
  },
  modalContainer: {
    backgroundColor: "#3672B9",
    margin: 10,
    shadowColor: "#777",
    borderRadius: 12,
    elevation: 2,
    shadowOpacity: 0.16,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    }
  },
  contactName: {
    color: "#000",
    margin: 3,
    fontSize: 20,
    fontWeight: "900",
    paddingTop: 20,
    marginLeft: "20%"
  },
  rows: {
    flexDirection: "row"
  },
  field: {
    color: "#bbdefb",
    margin: 6,
    marginLeft: "8%"
  },
  info: {
    color: "#888",
    margin: 6
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginLeft: "20%"
  },
  icons: {
    justifyContent: "center",
    zIndex: 3,
    alignItems: "center",
    alignSelf: "flex-end",
    width: 30,
    height: 30,
    margin: 10,
    shadowRadius: 5,
    borderRadius: 15,
    backgroundColor: "#fff"
  },
  defaultImage: {
    borderRadius: 25,
    width: 100,
    height: 100,
    position: "absolute",
    right: "10%",
    justifyContent: "flex-end",
    alignSelf: "center"
  }
});
