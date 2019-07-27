import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome";

export default (FBLoginButton = ({ onLogIn }) => {
  const onPress = () => {
    onLogIn();
  };

  return (
    <Icon.Button
      name="facebook"
      backgroundColor="#3b5998"
      onPress={onPress}
      {...iconStyles}
    >
      Login with Facebook
    </Icon.Button>
  );
});
const iconStyles = {
  borderRadius: 10,
  iconStyle: { paddingVertical: 5 },
  alignSelf: "center",
  alignItems: "center",
  justifyContent: "center",
  height: 60,
  width: "80%"
};
