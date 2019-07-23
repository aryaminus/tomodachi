import React from "react";
import logo from "./logo.svg";
import "./App.css";

// custom components
import FacebookLogin from "react-facebook-login";

function App() {
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
          console.log(user, token);
        }
      });
    });
  };
  return (
    <div className="App">
      <FacebookLogin
        appId="2430182417265110"
        fields="name,email,picture"
        callback={responseFacebook}
      />
    </div>
  );
}

export default App;
