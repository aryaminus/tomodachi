import { StyleSheet, Dimensions } from "react-native";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  bg: {
    flex: 1,
    resizeMode: "cover",
    width: DIMENSION_WIDTH,
    height: DIMENSION_HEIGHT,
    backgroundColor: "#558fd5"
  },
  scrollViewContainer: { marginHorizontal: 0 },
  navbar: {
    flex: 1,
    width: DIMENSION_WIDTH,
    height: 30
  },
  mapContainer: {
    flex: 1
  },
  containerHeader: {
    paddingTop: 60,
    backgroundColor: "#3672B9",
    position: "absolute",
    alignItems: "center",
    top: "30%",
    width: "100%",
    zIndex: 100
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 18,
    position: "absolute",
    top: 0,
    width: "100%"
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    paddingHorizontal: 8,
    marginTop: 2,
    textAlign: "center",
    width: DIMENSION_WIDTH - 100
  },
  actions: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center"
  },
  formContainer: {
    alignItems: "center",
    marginTop: "12%"
  },
  defaultImage: {
    borderRadius: 25,
    width: 200,
    height: 200,
    justifyContent: "center",
    alignSelf: "center"
  },
  info: {
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    width: "92%"
  },
  icon: {
    marginRight: 8
  },
  photo: {
    flex: 1,
    width: "90%",
    height: 280
  },
  searchBar: {
    position: "absolute",
    top: 8
  },
  locationText: {
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
    margin: 10
  },
  inputBox: {
    width: "92%",
    height: 60,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#000",
    color: "#cacaca",
    textAlign: "right"
  },
  viewrow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
    width: "96%",
    marginTop: 10
  },
  rowimage: {
    flexBasis: "33%",
    flexDirection: "column",
    width: "auto",
    height: DIMENSION_WIDTH / 3,
    borderWidth: 1,
    borderColor: "#fff"
  },
  circledButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#b197fc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginLeft: 10
  },
  roundedButton: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#b197fc",
    paddingHorizontal: 20
  },
  roundedButton2: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  textButton: {
    fontSize: 15,
    color: "#fff",
    paddingLeft: 5
  },
  textButton2: {
    fontSize: 18,
    // color: '#fff',
    paddingLeft: 5
  }
});
