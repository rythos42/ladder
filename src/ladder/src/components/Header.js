import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Badge from "@material-ui/core/Badge";

import EditSkillDialog from "./EditSkillDialog";
import EndorsementsIcon from "./endorsements.png";
import SkillsIcon from "./skills.png";
import styles from "./Header.module.css";

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

  addSkill = (levelId, summary) => {
    this.props.addSkill({ levelId, summary });
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
              <div className={styles.iconPanel}>
                <Badge
                  showZero={true}
                  badgeContent={this.props.claimCount}
                  color="primary"
                >
                  <img
                    src={EndorsementsIcon}
                    alt="Count of endorsements you've given to other people."
                    title="Count of endorsements you've given to other people."
                  />
                </Badge>
                <Badge
                  showZero={true}
                  badgeContent={this.props.endorsementCount}
                  color="primary"
                >
                  <img
                    src={SkillsIcon}
                    alt="Count of your claimed skills."
                    title="Count of your claimed skills."
                  />
                </Badge>
              </div>
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

function mapState({
  application: {
    showClaims,
    userProfile: { claimCount, endorsementCount }
  },
  auth: { account }
}) {
  return {
    showClaims,
    hasAccount: account !== null,
    claimCount: claimCount || 0,
    endorsementCount: endorsementCount || 0
  };
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
