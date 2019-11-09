import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";

import SkillsTable from "./SkillsTable";
import ClaimsTable from "./ClaimsTable";
import Profile from "./Profile";
import Header from "./../components/Header";

import styles from "./Main.module.css";

class Main extends React.Component {
  state = {
    snackbarOpen: false
  };

  async componentDidMount() {
    await this.props.initializeConfig();
    await this.props.initializeAuth();
  }

  async componentDidUpdate(prevProps) {
    if (!this.props.hasData && this.props.account)
      await this.props.initializeData();

    if (prevProps.snackbarMessage !== this.props.snackbarMessage) {
      this.setState({ snackbarOpen: true });
    }
  }

  handleSnackbarClose = () => {
    this.setState({ snackbarOpen: false });
  };

  render() {
    return (
      <Router>
        <Header />
        <section className={styles.main}>
          <Switch>
            <Route exact path="/">
              <SkillsTable />
            </Route>
            <Route path="/skills">
              <SkillsTable />
            </Route>
            <Route path="/claims">
              <ClaimsTable />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
          </Switch>
        </section>
        <section>
          <Snackbar
            open={this.state.snackbarOpen}
            autoHideDuration={6000}
            onClose={this.handleSnackbarClose}
            ContentProps={{
              "aria-describedby": "message-id"
            }}
            message={<span id="message-id">{this.props.snackbarMessage}</span>}
          />
        </section>
      </Router>
    );
  }
}

function mapState({
  application: { hasData, snackbarMessage },
  auth: { account, graphProfile, error }
}) {
  return {
    account,
    graphProfile,
    error,
    hasData,
    snackbarMessage
  };
}

function mapDispatch(dispatch) {
  return {
    initializeAuth: dispatch.auth.initialize,
    initializeData: dispatch.application.initialize,
    initializeConfig: dispatch.config.initialize
  };
}

export default connect(
  mapState,
  mapDispatch
)(Main);
