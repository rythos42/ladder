import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static" color="default">
        <Toolbar>
          <Grid container>
            <Grid item xs={6}>
              {this.props.showClaims ? (
                <Button onClick={this.props.requestShowSkills}>
                  Show Skills
                </Button>
              ) : (
                <Button onClick={this.props.requestShowClaims}>
                  Show Claims
                </Button>
              )}
            </Grid>
            <Grid container item xs={6} justify="flex-end">
              <FormControlLabel
                control={
                  <Checkbox
                    value={this.props.showDebug}
                    onChange={this.props.toggleShowDebug}
                  />
                }
                label="Debug"
              />
              {!this.props.account ? (
                <Button onClick={this.props.requestSignIn}>Sign In</Button>
              ) : (
                <Button onClick={this.props.requestSignOut}>Sign Out</Button>
              )}
              {this.props.error && (
                <p className="error">Error: {this.props.error}</p>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

function mapState({ application: { showClaims }, auth: { error, showDebug } }) {
  return { showClaims, error, showDebug };
}

function mapDispatch({ application, auth }) {
  return {
    requestSignIn: auth.requestSignIn,
    requestSignOut: auth.requestSignOut,
    toggleShowDebug: auth.toggleShowDebug,
    requestShowClaims: application.showClaims,
    requestShowSkills: application.showSkills
  };
}

export default connect(
  mapState,
  mapDispatch
)(Header);
