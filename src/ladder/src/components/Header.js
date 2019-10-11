import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

class Header extends React.Component {
  state = {
    addSkillDialogOpen: false,
    summary: "",
    level: ""
  };

  openAddSkillDialog = claimId => {
    this.setState({ addSkillDialogOpen: true });
  };

  closeAddSkillDialog = () => {
    this.setState({ addSkillDialogOpen: false });
  };

  setSummary = evt => {
    this.setState({ summary: evt.target.value });
  };

  changeLevel = evt => {
    this.setState({ level: evt.target.value });
  };

  addSkill = () => {
    this.props.addSkill({
      level: this.state.level,
      summary: this.state.summary
    });
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
        </Toolbar>
        <Dialog
          onClose={this.closeAddSkillDialog}
          open={this.state.addSkillDialogOpen}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Add Skill</DialogTitle>
          <DialogContent>
            <Select onChange={this.changeLevel} value={this.state.level}>
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
            <TextField
              multiline
              rows={6}
              onChange={this.setSummary}
              label="Summary"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeAddSkillDialog}>Cancel</Button>
            <Button onClick={this.addSkill} variant="contained">
              Add Skill
            </Button>
          </DialogActions>
        </Dialog>
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
