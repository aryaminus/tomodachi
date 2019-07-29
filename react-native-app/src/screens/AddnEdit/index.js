import React, { useState } from "react";
import { View, ScrollView, Text, TextInput, Image } from "react-native";

// custom components
import { Actions } from "react-native-router-flux";
import axios from "axios";

// styles
import styles from "./styles.js";
import Icon from "react-native-vector-icons/Ionicons";

function Form({ edit, item, person }) {
  const [firstName, setFirstName] = useState(edit ? item.firstname : ``);
  const [lastName, setLastName] = useState(edit ? item.lastname : ``);
  const [email, setEmail] = useState(edit ? item.email : ``);
  const [phone, setPhone] = useState(edit ? item.phone : ``);
  const [error, setError] = useState(``);
  const [output, setOutput] = useState(false);
  const [server, setServer] = useState(0);

  const checkFormErrors = async (firstName, lastName, email, phone) => {
    if (firstName.length < 2) {
      setOutput(false);
      setError("First Name needs to be at least 2 characters.");
    } else if (lastName.length < 2) {
      setOutput(false);
      setError("Last Name needs to be at least 2 characters.");
    } else if (email.length < 10) {
      setOutput(false);
      setError("Email needs to be at least 10 characters.");
    } else if (phone.length < 10) {
      setOutput(false);
      setError("Phone needs to be at least 10 characters.");
    } else {
      setOutput(true);
    }
  };

  const update = async () => {
    checkFormErrors(firstName, lastName, email, phone);
    if (output === true) {
      const user_id = person.user_id;
      const id = person.id;
      const newContact = { user_id, firstName, lastName, email, phone };
      if (edit) {
        await axios
          .put(
            `/api/contacts/update/${id}?user_id=${user_id}&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}`,
            newContact
          )
          .then(result => {
            console.log(result);
            // getContact(user_id);
            setServer(1);
          });
      } else {
        await axios
          .post(
            `/api/contacts/add?user_id=${user_id}&firstName=${firstName}&lastName=${lastName}&email=${email}&phone=${phone}`,
            newContact
          )
          .then(result => {
            console.log(result);
            // getContact(user_id);
            setServer(1);
          });
      }
    }
  };

  return (
    <>
      <View style={styles.bg}>
        <ScrollView style={styles.scrollViewContainer}>
          <View style={styles.navbar}>
            <View style={styles.containerHeader}>
              <View style={styles.header}>
                <Icon
                  name="ios-close"
                  color="#fff"
                  size={30}
                  onPress={() => Actions.pop()}
                />
                <View>
                  <Text style={styles.headerTitle}>
                    {edit ? "Edit Contact" : "Add Contact"}
                  </Text>
                </View>
                <Icon name="ios-send" color="#fff" size={25} onPress={update} />
              </View>
            </View>
          </View>

          <View style={styles.formContainer}>
            <Image
              style={styles.defaultImage}
              source={{
                uri: "https://i.imgur.com/VqKUGc3.png"
              }}
            />

            <View style={styles.info}>
              <Text style={styles.icon}>
                <Icon name="ios-man" size={25} />
              </Text>
              <TextInput
                style={styles.inputBox}
                placeholder="First Name"
                defaultValue={edit ? item.firstname : ""}
                placeholderColor="#90caf9"
                placeholderTextColor="#D2D2D2"
                selectionColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={TextInputValue => setFirstName(TextInputValue)}
                //autoFocus
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.icon}>
                <Icon name="ios-man" size={25} />
              </Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Last Name"
                defaultValue={edit ? item.lastname : ""}
                placeholderColor="#90caf9"
                placeholderTextColor="#D2D2D2"
                selectionColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={TextInputValue => setLastName(TextInputValue)}
                //autoFocus
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.icon}>
                <Icon name="ios-call" size={25} />
              </Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Phone Number"
                defaultValue={edit ? item.phone : ""}
                placeholderColor="#90caf9"
                placeholderTextColor="#D2D2D2"
                selectionColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={TextInputValue => setEmail(TextInputValue)}
                //autoFocus
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.icon}>
                <Icon name="ios-mail" size={25} />
              </Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Email"
                defaultValue={edit ? item.email : ""}
                placeholderColor="#90caf9"
                placeholderTextColor="#D2D2D2"
                selectionColor="#fff"
                underlineColorAndroid="transparent"
                onChangeText={TextInputValue => setPhone(TextInputValue)}
                //autoFocus
              />
            </View>
          </View>
          {server == 1 ? <Text>Message sent sucessfully!</Text> : null}
          {output ? null : <Text>{error}</Text>}
        </ScrollView>
      </View>
    </>
  );
}

export default Form;
