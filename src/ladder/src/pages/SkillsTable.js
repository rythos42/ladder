import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import * as tableHelper from "./../TableHelper";
import SortableTableHead from "./../components/SortableTableHead";

class SkillsTable extends React.Component {
  state = {
    claimSkillDialogOpen: false,
    claimingSkillId: -1,
    claimEvidence: "",
    endorserEmails: "",
    order: "asc",
    orderBy: "Summary"
  };

  openClaimSkillDialog = skillId => {
    this.setState({ claimSkillDialogOpen: true, claimingSkillId: skillId });
  };

  closeClaimSkillDialog = () => {
    this.setState({ claimSkillDialogOpen: false });
  };

  setClaimEvidence = evt => {
    this.setState({ claimEvidence: evt.target.value });
  };

  changeEmail = evt => {
    this.setState({ endorserEmails: evt.target.value });
  };

  claimSkill = () => {
    this.props.claimSkill({
      claimingSkillId: this.state.claimingSkillId,
      claimEvidence: this.state.claimEvidence,
      endorserEmails: this.state.endorserEmails
    });
    this.closeClaimSkillDialog();
  };

  handleRequestSort = property => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  tableHeaders = [
    { label: "Summary", id: "summary" },
    { label: "Level", id: "level" },
    { label: "Claimed", id: "claimed" },
    { label: "Endorsed", id: "endorsed" }
  ];

  render() {
    return (
      <>
        <Table>
          <SortableTableHead
            tableHeaders={this.tableHeaders}
            order={this.state.order}
            orderBy={this.state.orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {tableHelper
              .stableSort(
                this.props.skills,
                this.state.order,
                this.state.orderBy
              )
              .map(skill => (
                <TableRow key={skill.id}>
                  <TableCell>{skill.summary}</TableCell>
                  <TableCell>{skill.level}</TableCell>
                  <TableCell>
                    {skill.claimed ? (
                      <CheckIcon />
                    ) : (
                      <Button
                        onClick={() => this.openClaimSkillDialog(skill.id)}
                      >
                        Claim
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {skill.endorsed ? <CheckIcon /> : <CloseIcon />}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
          onClose={this.closeClaimSkillDialog}
          open={this.state.claimSkillDialogOpen}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Claim Skill</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.changeEmail}
              label="Endorser E-mail(s)"
              fullWidth
            />
            <TextField
              multiline
              rows={6}
              onChange={this.setClaimEvidence}
              label="Evidence"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeClaimSkillDialog}>Cancel</Button>
            <Button onClick={this.claimSkill} variant="contained">
              Claim
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

function mapState({ application: { skills } }) {
  return { skills };
}

function mapDispatch({ application }) {
  return {
    claimSkill: application.claimSkill
  };
}

export default connect(
  mapState,
  mapDispatch
)(SkillsTable);
