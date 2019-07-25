import React, { useState } from "react";

//styles
import * as S from "./styles";
import background from "./images/background.svg";
import "rodal/lib/rodal.css";

// custom components
import FacebookLogin from "react-facebook-login";
import Rodal from "rodal";
import { Container, Button } from "react-floating-action-button";

// imports
import AddContact from "./components/AddContact";
import ContactInfo from "./components/ContactInfo";

var contactsArray = [
  {
    firstName: "Mary",
    lastName: "Blanchard",
    phone: "555-1234",
    email: "snowwhite@ouatmail.com"
  },
  {
    firstName: "David",
    lastName: "Nolan",
    phone: "555-9876",
    email: "princecharming@ouatmail.com"
  },
  {
    firstName: "Emma",
    lastName: "Swan",
    phone: "555-2345",
    email: "thesavior@ouatmail.com"
  }
];

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const [addModal, showAddModal] = useState(false);
  const [person, setPerson] = useState(null);

  const responseFacebook = async response => {
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
          console.log(user);
          setAuthenticated(true);
          setUser(user);
          setToken(token);
        }
      });
    });
  };

  return (
    <div className="App">
      <S.Background src={background} />
      {!isAuthenticated ? (
        <S.FacebookContainer>
          <FacebookLogin
            appId="2430182417265110"
            fields="name,email,picture"
            callback={response => responseFacebook(response)}
          />
        </S.FacebookContainer>
      ) : (
        <>
          <S.ContactsContainer>
            <S.ContactList>
              <h2>Contact List</h2>
              {contactsArray.map(function(c) {
                var contactStyles = {
                  backgroundColor: c === person ? "#bbdefb" : ""
                };
                return (
                  <S.Contact onClick={() => setPerson(c)} style={contactStyles}>
                    <span>
                      {c.firstName} {c.lastName}
                    </span>
                  </S.Contact>
                );
              }, this)}
            </S.ContactList>
            <S.ContactInfo>
              <ContactInfo person={person} />
            </S.ContactInfo>
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
            <AddContact user_id={user.id} />
          </Rodal>
        </>
      )}
    </div>
  );
}

export default App;
