// components
import React from "react";
import { Text, View, Image } from "react-native";

// styles
import styles from "./styles.js";

const ListItem = ({ itemDetail }) => {
  console.log(itemDetail);
  return (
    <View style={styles.containerItem}>
      {/* <Image
        source={{
          uri: itemDetail.image[0]
        }}
        style={styles.image}
      /> */}
      <View style={styles.content}>
        <Text style={styles.title}>
          {itemDetail.firstname} {itemDetail.lastname}
        </Text>
        <Text style={styles.info}>{itemDetail.phone}</Text>
      </View>
    </View>
  );
};

export default ListItem;
