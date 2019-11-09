import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AccountBoxIcon from "@material-ui/icons/AccountBox";

import EditSkillDialog from "./EditSkillDialog";
import EndorsementsIcon from "./endorsements.png";
import SkillsIcon from "./skills.png";
import styles from "./Header.module.css";
import { IconButton } from "@material-ui/core";

class Header extends React.Component {
  state = {
    selectedTabIndex: 0,
    addSkillDialogOpen: false
  };

  componentDidMount() {
    const loadingTabIndex = this.props.location.pathname === "/skills" ? 0 : 1;
    this.setState({ selectedTabIndex: loadingTabIndex });
  }

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

  handleTabChange = (evt, newValue) => {
    this.setState({ selectedTabIndex: newValue });
  };

  render() {
    return (
      <AppBar position="static" color="default">
        <Grid container>
          <Grid item xs={6}>
            <Tabs
              indicatorColor="primary"
              textColor="primary"
              value={this.state.selectedTabIndex}
              onChange={this.handleTabChange}
            >
              <Tab label="Skills" to="/skills" component={Link} />
              <Tab label="Claims" to="/claims" component={Link} />
            </Tabs>
          </Grid>
          <Grid container item xs={6} justify="flex-end">
            {this.props.hasAccount ? (
              <>
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
                <IconButton to="/profile" component={Link}>
                  <AccountBoxIcon />
                </IconButton>
                <Button onClick={this.openAddSkillDialog}>Add Skill</Button>
                <Button onClick={this.props.requestSignOut}>Sign Out</Button>
              </>
            ) : (
              <Button onClick={this.props.requestSignIn}>Sign In</Button>
            )}
          </Grid>
        </Grid>
        <EditSkillDialog
          confirmButtonLabel="Add Skill"
          onConfirm={this.addSkill}
          onClose={this.closeAddSkillDialog}
          open={this.state.addSkillDialogOpen}
        />
      </AppBar>
    );
  }
}

function mapState({
  application: {
    userProfile: { claimCount, endorsementCount }
  },
  auth: { account }
}) {
  return {
    hasAccount: account !== null,
    claimCount: claimCount || 0,
    endorsementCount: endorsementCount || 0
  };
}

function mapDispatch({ application, auth }) {
  return {
    requestSignIn: auth.requestSignIn,
    requestSignOut: auth.requestSignOut,
    requestShowSkills: application.showSkills,
    addSkill: application.addSkill
  };
}

export default compose(
  withRouter,
  connect(
    mapState,
    mapDispatch
  )
)(Header);
