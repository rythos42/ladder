import React from "react";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

import * as tableHelper from "./../TableHelper";
import SortableTableHead from "./../components/SortableTableHead";
import EndorsementDialog from "../components/EndorsementDialog";

class ClaimsTable extends React.Component {
  state = {
    endorsementDialogOpen: false,
    selectedClaim: { messages: [] },
    order: "asc",
    orderBy: "Summary"
  };

  componentDidUpdate(prevProps) {
    if (prevProps.claims === this.props.claims) return;

    const selectedClaim = this.props.claims.find(
      claim => claim.id === this.state.selectedClaim.id
    );
    if (selectedClaim) this.setState({ selectedClaim });
  }

  openEndorsementDialog = claim => {
    this.setState({ endorsementDialogOpen: true, selectedClaim: claim });
  };

  closeEndorsementDialog = () => {
    this.setState({ endorsementDialogOpen: false });
  };

  endorse = message => {
    this.props.endorse({
      claimId: this.state.selectedClaim.id,
      message: message
    });
    this.closeEndorsementDialog();
  };

  addMessage = async message => {
    await this.props.addMessage({
      claimId: this.state.selectedClaim.id,
      message: message
    });
    this.props.getMessages(this.state.selectedClaim.id);
  };

  handleRequestSort = property => {
    const isDesc =
      this.state.orderBy === property && this.state.order === "desc";
    this.setState({ order: isDesc ? "asc" : "desc" });
    this.setState({ orderBy: property });
  };

  tableHeaders = [
    { label: "User", id: "user" },
    { label: "Summary", id: "summary" },
    { label: "", id: "endorse" }
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
            {this.props.hasAccount ? (
              this.props.claims.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No claims that need endorsement.
                  </TableCell>
                </TableRow>
              ) : (
                tableHelper
                  .stableSort(
                    this.props.claims,
                    this.state.order,
                    this.state.orderBy
                  )
                  .map(claim => (
                    <React.Fragment key={claim.id}>
                      <TableRow>
                        <TableCell>{claim.fromUsername}</TableCell>
                        <TableCell>{claim.skillSummary}</TableCell>
                        <TableCell>
                          <Button
                            onClick={() => this.openEndorsementDialog(claim)}
                          >
                            Endorse
                          </Button>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))
              )
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center">
                  Sign in to view claims!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <EndorsementDialog
          open={this.state.endorsementDialogOpen}
          onClose={this.closeEndorsementDialog}
          onEndorse={this.endorse}
          onAddMessage={this.addMessage}
          claim={this.state.selectedClaim}
        />
      </>
    );
  }
}

function mapState({ application: { claims }, auth: { account } }) {
  return { claims, hasAccount: account !== null };
}

function mapDispatch({ application }) {
  return {
    endorse: application.endorse,
    addMessage: application.addMessage,
    getMessages: application.getMessages
  };
}

export default connect(
  mapState,
  mapDispatch
)(ClaimsTable);
