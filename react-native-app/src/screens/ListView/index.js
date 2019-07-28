// components
import React, { useState } from "react";
import {
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Image
} from "react-native";

// custom components
import { Actions } from "react-native-router-flux";

// styles
import styles from "./styles.js";
import Icon from "react-native-vector-icons/Ionicons";

// imports
import ListItem from "../../components/ListItem";

function ListView({ avatar, user, token, contactList }) {
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
                onPress={() => Actions.detail({ itemDetail: item })}
              >
                <ListItem itemDetail={item} />
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </View>
    </View>
  );
}

export default ListView;
