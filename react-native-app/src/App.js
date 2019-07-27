import React, { useState } from "react";
import { StatusBar, View, ImageBackground, Text } from "react-native";

//styles
import styles from "./styles.js";
import Background from "../images/background.png";

const App = () => {
  return (
    <React.Fragment>
      <StatusBar
        hidden
        // translucent
        // backgroundColor="#3672B9"
        // barStyle="light-content"
      />
      <View style={styles.container}>
        <ImageBackground source={Background} style={styles.backgroundImage}>
          <View style={styles.loginForm}>
            <Text>Login</Text>
          </View>
        </ImageBackground>
      </View>
    </React.Fragment>
  );
};

export default App;
