import React, { useState } from "react";
import { StatusBar, View, ImageBackground, Text } from "react-native";

//styles
import styles from "./styles.js";
import Background from "../../images/background.png";

// custom components
import axios from "axios";
import { Actions } from "react-native-router-flux";
import { AccessToken, LoginManager } from "react-native-fbsdk";

// imports
import FBLoginButton from "../../components/FBLoginButton";

const Fblogin = () => {
  // const [isAuthenticated, setAuthenticated] = useState(false);
  // const [user, setUser] = useState({});
  // const [avatar, setAvatar] = useState("");
  // const [token, setToken] = useState("");
  // const [contactList, setContactList] = useState([]);

  loginWithFacebook = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email"
      ]);

      if (result.isCancelled) {
        alert("Login is Cancelled");
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw "Something went wrong obtaining the users access token";
      }

      // console.log(data);
      await axios
        .post(`https://tomodachi977.herokuapp.com/api/auth/facebook`, {
          access_token: data.accessToken.toString()
        })
        .then(r => {
          console.log(r);
          const token = r.headers["x-auth-token"];
          if (token) {
            // setAuthenticated(true);
            // setToken(token);
            // setAvatar(r.data.photos[0].value);
            // setUser(r.data);
            getContact(r.data.photos[0].value, r.data, token, r.data.id);
          }
        });
    } catch (err) {
      LoginManager.logOut();
      alert(err);
      console.log("eror in login- ", err);
    }
  };

  const getContact = async (avatar, user, token, user_id) => {
    await axios
      .get(`https://tomodachi977.herokuapp.com/api/contacts/get/${user_id}`, {
        headers: { Authorization: "bearer " + token }
      })
      .then(result => {
        // setContactList(result.data.data);
        Actions.listView({
          avatar: avatar,
          user: user,
          token: token,
          contactList: result.data.data
        });
      });
  };

  return (
    <React.Fragment>
      <StatusBar
        // hidden
        translucent
        backgroundColor="#3672B9"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <ImageBackground source={Background} style={styles.backgroundImage}>
          <View style={styles.loginForm}>
            <FBLoginButton onLogIn={loginWithFacebook} />
          </View>
        </ImageBackground>
      </View>
    </React.Fragment>
  );
};

export default Fblogin;
