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
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import * as tableHelper from "./../TableHelper";
import SortableTableHead from "./../components/SortableTableHead";
import EditSkillDialog from "./../components/EditSkillDialog";
import styles from "./SkillsTable.module.css";

class SkillsTable extends React.Component {
  state = {
    claimSkillDialogOpen: false,
    claimingSkillId: -1,
    claimEvidence: "",
    endorserEmails: "",
    order: "asc",
    orderBy: "Summary",
    editSkillDialogOpen: false,
    editingSkill: {
      id: -1,
      level: "",
      summary: ""
    },
    filter: {
      summary: ""
    }
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

  openEditSkillDialog = (id, level, summary) => {
    this.setState({
      editSkillDialogOpen: true,
      editingSkill: { id, level, summary }
    });
  };

  closeEditSkillDialog = () => {
    this.setState({ editSkillDialogOpen: false });
  };

  editSkill = (level, summary) => {
    this.props.editSkill({
      skillId: this.state.editingSkill.id,
      level,
      summary
    });
    this.closeEditSkillDialog();
  };

  handleRequestSort = property => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  setSummaryFilter = evt => {
    this.setState({ filter: { summary: evt.target.value.toLowerCase() } });
  };

  tableHeaders = [
    { label: "Summary", id: "summary" },
    { label: "Level", id: "level" },
    { label: "Claimed", id: "claimed" },
    { label: "Endorsed", id: "endorsed" },
    { label: "", id: "actions" }
  ];

  render() {
    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Card className={styles.filter}>
              <Typography>Filter</Typography>
              <TextField onChange={this.setSummaryFilter} label="Summary" />
            </Card>
          </Grid>
          <Grid item xs={12}>
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
                  .filter(
                    skill =>
                      skill.summary
                        .toLowerCase()
                        .indexOf(this.state.filter.summary) !== -1
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
                      <TableCell>
                        <Button
                          onClick={() =>
                            this.openEditSkillDialog(
                              skill.id,
                              skill.level,
                              skill.summary
                            )
                          }
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
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
        <EditSkillDialog
          confirmButtonLabel="Edit Skill"
          onConfirm={this.editSkill}
          onClose={this.closeEditSkillDialog}
          open={this.state.editSkillDialogOpen}
          level={this.state.editingSkill.level}
          summary={this.state.editingSkill.summary}
        />
      </>
    );
  }
}

function mapState({ application: { skills } }) {
  return { skills };
}

function mapDispatch({ application }) {
  return {
    claimSkill: application.claimSkill,
    editSkill: application.editSkill
  };
}

export default connect(
  mapState,
  mapDispatch
)(SkillsTable);
