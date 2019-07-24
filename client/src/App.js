import React, { useState } from "react";

//styles
import * as S from "./styles";
import background from "./images/background.svg";

// custom components
import FacebookLogin from "react-facebook-login";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");

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
      {!isAuthenticated ? (
        <S.FacebookContainer>
          <FacebookLogin
            appId="2430182417265110"
            fields="name,email,picture"
            callback={responseFacebook}
          />
        </S.FacebookContainer>
      ) : null}
    </div>
  );
}

export default App;
