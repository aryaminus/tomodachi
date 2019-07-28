// components
import React from "react";
import { Scene, Router, Modal } from "react-native-router-flux";

// custom components
// import WelcomeScreen from './screens/WelcomeScreen';
import Fblogin from "./screens/Fblogin";
import ListView from "./screens/ListView";
import Detail from "./screens/Detail";

const RouterComponent = () => (
  <Router>
    <Modal>
      <Scene key="root" hideNavBar component={Fblogin} panHandlers={null} />
      <Scene
        key="listView"
        hideNavBar
        component={ListView}
        panHandlers={null}
      />
      <Scene key="detail" hideNavBar component={Detail} panHandlers={null} />
    </Modal>
  </Router>
);

export default RouterComponent;
