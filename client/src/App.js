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

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

  const [addModal, showAddModal] = useState(false);

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
      {isAuthenticated ? (
        <S.FacebookContainer>
          <FacebookLogin
            appId="2430182417265110"
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </S.FacebookContainer>
      ) : (
        <>
          <S.ContactsContainer>Contact List </S.ContactsContainer>
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
            <AddContact />
          </Rodal>
        </>
      )}
    </div>
  );
}

export default App;
