// components
import React, { useState } from "react";
import {
  Linking,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image
} from "react-native";

// custom components
import Modal from "react-native-modal";

// styles
import styles from "./styles.js";
import Icon from "react-native-vector-icons/FontAwesome";

// imports
import ListItem from "../../components/ListItem";

function ListView({ avatar, user, token, contactList }) {
  const [isVisibleModal, setVisibleModal] = useState(false);
  const [modalItem, setmodalItem] = useState({});

  return (
    <View style={styles.bg}>
      <StatusBar
        // hidden
        translucent
        backgroundColor="#3672B9"
        barStyle="light-content"
      />
      <View style={styles.containerLists}>
        <ScrollView>
          <View style={styles.top}>
            <Text style={styles.title}>Contact List</Text>
            <Image
              style={styles.avatar}
              source={{
                uri: avatar
              }}
            />
          </View>

          <FlatList
            data={contactList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setVisibleModal(true);
                  setmodalItem(item);
                }}
              >
                <ListItem itemDetail={item} />
              </TouchableOpacity>
            )}
          />
          <Modal
            isVisible={isVisibleModal}
            // hideModalContentWhileAnimating={true}
            // onSwipeComplete={() => setVisibleModal(false)}
            // swipeDirection="left"
            onBackdropPress={() => setVisibleModal(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.contactName}>{modalItem.firstname}</Text>

              <View style={styles.rows}>
                <Text style={styles.field}>Phone:</Text>
                <TouchableOpacity
                  style={styles.info}
                  onPress={() => Linking.openURL("tel:" + modalItem.phone)}
                >
                  <Text>{modalItem.phone}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.rows}>
                <Text style={styles.field}>Email:</Text>
                <TouchableOpacity
                  style={styles.info}
                  onPress={() => Linking.openURL("mailto:" + modalItem.email)}
                >
                  <Text href={"mailto:" + modalItem.email}>
                    {modalItem.email}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  zIndex: 4,
                  flex: 1,
                  marginTop: -0,
                  justifyContent: "flex-start",
                  alignItems: "flex-start"
                }}
              >
                <TouchableOpacity
                  // onPress={() => this.props.onClicked1()}
                  style={[
                    {
                      justifyContent: "center",
                      zIndex: 3,
                      alignItems: "center",
                      alignSelf: "flex-end",
                      width: 30,
                      height: 30,
                      margin: 10,
                      shadowRadius: 5,
                      borderRadius: 15
                      // backgroundColor: this.props.iconBackground1
                    }
                  ]}
                >
                  <Icon
                    // name={this.props.icon1}
                    // color={this.props.iconColor1}
                    size={15}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  // onPress={() => this.props.onClicked2()}
                  style={[
                    {
                      justifyContent: "center",
                      zIndex: 3,
                      alignItems: "center",
                      alignSelf: "flex-end",
                      width: 30,
                      height: 30,
                      margin: 10,
                      shadowRadius: 5,
                      borderRadius: 15
                      // backgroundColor: this.props.iconBackground2
                    }
                  ]}
                >
                  <Icon
                    // name={this.props.icon2}
                    // color={this.props.iconColor2}
                    size={15}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
}

export default ListView;
