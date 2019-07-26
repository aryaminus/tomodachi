import React, { useState } from "react";

//styles
import * as S from "./styles";
import background from "./images/background.svg";
import "rodal/lib/rodal.css";

// custom components
import FacebookLogin from "react-facebook-login";
import axios from "axios";
import Rodal from "rodal";
import { Container, Button } from "react-floating-action-button";

// imports
import AddContact from "./components/AddContact";
import ContactInfo from "./components/ContactInfo";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState("");
  const [token, setToken] = useState("");
  const [contactList, setContactList] = useState([]);

  const [addModal, showAddModal] = useState(false);
  const [hideContact, sethideContact] = useState(false);
  const [person, setPerson] = useState(null);

  const responseFacebook = response => {
    console.log(response);
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    const options = {
      method: "POST",
      body: tokenBlob,
      mode: "cors",
      cache: "default"
    };
    fetch("/auth/facebook", options).then(r => {
      const token = r.headers.get("x-auth-token");
      r.json().then(user => {
        if (token) {
          console.log(user.photos[0].value);
          setAuthenticated(true);
          setAvatar(user.photos[0].value);
          setUser(user);
          setToken(token);
          getContact(user.id);
        }
      });
    });
  };

  const getContact = async user_id => {
    console.log(user_id);
    await axios.get(`/api/contacts/get/${user_id}`).then(result => {
      setContactList(result.data.data);
      console.log(result.data.data);
    });
  };

  return (
    <div className="App">
      <S.Background src={background} />
      {!isAuthenticated && user !== {} ? (
        <S.FacebookContainer>
          <FacebookLogin
            appId="2430182417265110"
            fields="name,email,picture"
            callback={response => responseFacebook(response)}
          />
        </S.FacebookContainer>
      ) : (
        <>
          <S.UserDetail>
            <S.Avatar src={avatar} />
            <h2>{user.displayName}</h2>
          </S.UserDetail>
          <S.ContactsContainer>
            <S.ContactList>
              <h2>Contact List</h2>

              {contactList !== [] &&
                contactList.map(function(c) {
                  var contactStyles = {
                    backgroundColor: c === person ? "#bbdefb" : ""
                  };
                  return (
                    <S.Contact
                      onClick={() => {
                        setPerson(c);
                        sethideContact(false);
                      }}
                      style={contactStyles}
                    >
                      <span>
                        {c.firstname} {c.lastname}
                      </span>
                    </S.Contact>
                  );
                }, this)}
            </S.ContactList>

            {!hideContact && (
              <S.ContactInfo>
                <ContactInfo
                  person={person}
                  getContact={getContact}
                  sethideContact={sethideContact}
                />
              </S.ContactInfo>
            )}
          </S.ContactsContainer>
          <Container>
            <Button
              tooltip="Add Contact"
              // icon="fa-plus"
              rotate={true}
              onClick={() => showAddModal(true)}
              styles={{
                backgroundColor: "#bbdefb",
                color: "#0d47a1",
                fontSize: 32
              }}
            >
              +
            </Button>
          </Container>
          <Rodal
            visible={addModal}
            onClose={() => showAddModal(false)}
            customStyles={{
              background: "#bbdefb",
              borderRadius: 15,
              width: 320,
              height: 300
            }}
          >
            <div>Add Contact</div>
            <AddContact
              user_id={user.id}
              getContact={getContact}
              showAddModal={showAddModal}
            />
          </Rodal>
        </>
      )}
    </div>
  );
}

export default App;
