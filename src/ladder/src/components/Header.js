import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import EditSkillDialog from "./EditSkillDialog";

class Header extends React.Component {
  state = {
    addSkillDialogOpen: false
  };

  openAddSkillDialog = () => {
    this.setState({ addSkillDialogOpen: true });
  };

  closeAddSkillDialog = () => {
    this.setState({ addSkillDialogOpen: false });
  };

  addSkill = (level, summary) => {
    this.props.addSkill({ level, summary });
    this.closeAddSkillDialog();
  };

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
              {this.props.hasAccount && (
                <Button onClick={this.openAddSkillDialog}>Add Skill</Button>
              )}
              {!this.props.account ? (
                <Button onClick={this.props.requestSignIn}>Sign In</Button>
              ) : (
                <Button onClick={this.props.requestSignOut}>Sign Out</Button>
              )}
            </Grid>
          </Grid>
          <EditSkillDialog
            confirmButtonLabel="Add Skill"
            onConfirm={this.addSkill}
            onClose={this.closeAddSkillDialog}
            open={this.state.addSkillDialogOpen}
          />
        </Toolbar>
      </AppBar>
    );
  }
}

function mapState({ application: { showClaims }, auth: { account } }) {
  return { showClaims, hasAccount: account !== null };
}

function mapDispatch({ application, auth }) {
  return {
    requestSignIn: auth.requestSignIn,
    requestSignOut: auth.requestSignOut,
    requestShowClaims: application.showClaims,
    requestShowSkills: application.showSkills,
    addSkill: application.addSkill
  };
}

export default connect(
  mapState,
  mapDispatch
)(Header);
