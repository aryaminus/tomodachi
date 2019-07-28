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
              <View style={styles.rows}>
                <View>
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
                      onPress={() =>
                        Linking.openURL("mailto:" + modalItem.email)
                      }
                    >
                      <Text href={"mailto:" + modalItem.email}>
                        {modalItem.email}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.buttons}>
                    <TouchableOpacity
                      // onPress={() => this.props.onClicked1()}
                      style={styles.icons}
                    >
                      <Icon
                        name="edit"
                        // color={this.props.iconColor1}
                        size={15}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      // onPress={() => this.props.onClicked2()}
                      style={styles.icons}
                    >
                      <Icon
                        name="trash"
                        // color={this.props.iconColor2}
                        size={15}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <Image
                  style={styles.defaultImage}
                  source={{
                    uri: "https://i.imgur.com/VqKUGc3.png"
                  }}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </View>
  );
}

export default ListView;
