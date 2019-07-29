// components
import React from "react";
import { Scene, Router, Modal } from "react-native-router-flux";

// custom components
// import WelcomeScreen from './screens/WelcomeScreen';
import Fblogin from "./screens/Fblogin";
import ListView from "./screens/ListView";
import AddnEdit from "./screens/AddnEdit";

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
      <Scene key="addNedit" hideNavBar component={AddnEdit} panHandlers={null} />
    </Modal>
  </Router>
);

export default RouterComponent;
