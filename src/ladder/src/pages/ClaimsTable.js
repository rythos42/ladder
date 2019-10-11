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

import * as tableHelper from "./../TableHelper";
import SortableTableHead from "./../components/SortableTableHead";

class ClaimsTable extends React.Component {
  state = {
    endorsementDialogOpen: false,
    selectedClaimId: -1,
    endorsementEvidence: "",
    order: "asc",
    orderBy: "Summary"
  };

  openEndorsementDialog = claimId => {
    this.setState({ endorsementDialogOpen: true, selectedClaimId: claimId });
  };

  closeEndorsementDialog = () => {
    this.setState({ endorsementDialogOpen: false });
  };

  setEndorsementEvidence = evt => {
    this.setState({ endorsementEvidence: evt.target.value });
  };

  endorse = () => {
    this.props.endorse({
      claimId: this.state.selectedClaimId,
      endorsementEvidence: this.state.endorsementEvidence
    });
    this.closeEndorsementDialog();
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
            {this.props.claims.length === 0 && (
              <TableRow>
                <TableCell colSpan={3}>
                  No claims that need endorsement.
                </TableCell>
              </TableRow>
            )}
            {tableHelper
              .stableSort(
                this.props.claims,
                this.state.order,
                this.state.orderBy
              )
              .map(claim => (
                <TableRow key={claim.id}>
                  <TableCell>{claim.fromUsername}</TableCell>
                  <TableCell>{claim.skillSummary}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => this.openEndorsementDialog(claim.id)}
                    >
                      Endorse
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Dialog
          onClose={this.closeEndorsementDialog}
          open={this.state.endorsementDialogOpen}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>Claim Skill</DialogTitle>
          <DialogContent>
            <TextField
              multiline
              rows={6}
              onChange={this.setEndorsementEvidence}
              label="Evidence"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeEndorsementDialog}>Cancel</Button>
            <Button onClick={this.endorse} variant="contained">
              Endorse
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

function mapState({ application: { claims } }) {
  return { claims };
}

function mapDispatch({ application }) {
  return { endorse: application.endorse };
}

export default connect(
  mapState,
  mapDispatch
)(ClaimsTable);
