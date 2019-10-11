import React from "react";
import { connect } from "react-redux";
import Paper from "@material-ui/core/Paper";

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
        <section>
          <Paper className={styles.paper}>
            {this.props.showClaims ? <ClaimsTable /> : <SkillsTable />}
          </Paper>
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
    initializeData: dispatch.application.initialize
  };
}

export default connect(
  mapState,
  mapDispatch
)(Main);
