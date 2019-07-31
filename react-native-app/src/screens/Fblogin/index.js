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
      const tokenBlob = new Blob(
        [
          JSON.stringify({ access_token: data.accessToken.toString() }, null, 2)
        ],
        { type: "application/json" }
      );
      const options = {
        method: "POST",
        body: tokenBlob,
        mode: "cors",
        cache: "default"
      };
      fetch(
        "https://tomodachi977.herokuapp.com/api/auth/facebook",
        options
      ).then(r => {
        const token = r.headers.get("x-auth-token");
        r.json().then(user => {
          if (token) {
            // console.log(user);
            // setAuthenticated(true);
            // setAvatar(user.photos[0].value);
            // setUser(user);
            // setToken(token);
            getContact(user.photos[0].value, user, token, user.id);
          }
        });
      });
    } catch (err) {
      LoginManager.logOut();
      alert(err);
      console.log("eror in login- ", err);
    }
  };

  const getContact = async (avatar, user, token, user_id) => {
    await axios
      .get(`https://tomodachi977.herokuapp.com/api/contacts/get/${user_id}`)
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
      // translucent
      // backgroundColor="#3672B9"
      // barStyle="light-content"
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
