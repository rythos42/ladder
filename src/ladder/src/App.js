import React from "react";
import { Provider } from "react-redux";

import store from "./storage/store";
import Main from "./pages/Main";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
