import React from "react";
import { connect } from "react-redux";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

import SkillsTable from "./SkillsTable";
import ClaimsTable from "./ClaimsTable";
import Header from "./../components/Header";

import styles from "./Main.module.css";

const Json = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

class Main extends React.Component {
  async componentDidMount() {
    await this.props.initializeAuth();
  }

  async componentDidUpdate() {
    if (!this.props.hasData && this.props.account)
      await this.props.initializeData();
  }

  render() {
    return (
      <>
        <Header error={this.props.error} account={this.props.account} />
        <section className={styles.main}>
          {this.props.showClaims ? <ClaimsTable /> : <SkillsTable />}
        </section>
        <section className={styles.debugPanel}>
          <FormControlLabel
            control={
              <Checkbox
                value={this.props.showDebug}
                onChange={this.props.toggleShowDebug}
              />
            }
            label="Debug auth"
          />
          {this.props.error && (
            <p className="error">Error: {this.props.error}</p>
          )}
        </section>
        {this.props.showDebug && (
          <section className="data">
            {this.props.account && (
              <div className="data-account">
                <h2>Session Account Data</h2>
                <Json data={this.props.account} />
              </div>
            )}
            {this.props.graphProfile && (
              <div className="data-graph">
                <h2>Graph Profile Data</h2>
                <Json data={this.props.graphProfile} />
              </div>
            )}
          </section>
        )}
      </>
    );
  }
}

function mapState({
  application: { hasData, showClaims },
  auth: { account, graphProfile, error, showDebug }
}) {
  return {
    account,
    graphProfile,
    error,
    showDebug,
    hasData,
    showClaims
  };
}

function mapDispatch(dispatch) {
  return {
    initializeAuth: dispatch.auth.initialize,
    initializeData: dispatch.application.initialize,
    toggleShowDebug: dispatch.auth.toggleShowDebug
  };
}

export default connect(
  mapState,
  mapDispatch
)(Main);
