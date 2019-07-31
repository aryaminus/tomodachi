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
import axios from "axios";
import Modal from "react-native-modal";
import { Actions } from "react-native-router-flux";
import { FloatingAction } from "react-native-floating-action";

// styles
import styles from "./styles.js";
import Icon from "react-native-vector-icons/FontAwesome";

// imports
import ListItem from "../../components/ListItem";

function ListView({ avatar, user, token, contactList }) {
  const [contacts, setContacts] = useState(contactList);

  const [isVisibleModal, setVisibleModal] = useState(false);
  const [modalItem, setmodalItem] = useState({});

  const actions = [
    {
      text: "Add Contact",
      icon: require("../../images/add.png"),
      name: "add_contact",
      position: 1
    }
  ];

  const dalete = async id => {
    await axios
      .delete(`https://tomodachi977.herokuapp.com/api/contacts/delete/${id}`)
      .then(result => {
        console.log(result);
        getContact(user.id);
        setVisibleModal(false);
      });
  };

  const getContact = async user_id => {
    // console.log("here");
    console.log(user_id);
    await axios
      .get(`https://tomodachi977.herokuapp.com/api/contacts/get/${user_id}`)
      .then(result => {
        setContacts(result.data.data);
      });
  };

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
            data={contacts}
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
                      onPress={() => {
                        setVisibleModal(false);
                        Actions.addNedit({
                          edit: true,
                          item: modalItem,
                          person: user,
                          getContact: getContact
                        });
                      }}
                      style={styles.icons}
                    >
                      <Icon name="edit" size={15} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => dalete(modalItem.id)}
                      style={styles.icons}
                    >
                      <Icon name="trash" size={15} />
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
        <FloatingAction
          actions={actions}
          onPressItem={name => {
            Actions.addNedit({
              edit: false,
              item: null,
              person: user,
              getContact: getContact
            });
          }}
        />
      </View>
    </View>
  );
}

export default ListView;
