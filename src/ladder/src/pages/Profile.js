import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import CommentIcon from "@material-ui/icons/Comment";

import styles from "./Profile.module.css";
import AzureProfilePhoto from "../components/AzureProfilePhoto";
import EndorsementDialog from "../components/EndorsementDialog";

class Profile extends React.Component {
  state = {
    endorsementDialogOpen: false,
    selectedClaim: {}
  };

  formatDate = date => {
    return new Date(date).toDateString();
  };

  openEndorsementDialog = claim => {
    this.setState({ endorsementDialogOpen: true, selectedClaim: claim });
  };

  closeEndorsementDialog = () => {
    this.setState({ endorsementDialogOpen: false });
  };

  addMessage = async message => {
    await this.props.addMessage({
      claimId: this.state.selectedClaim.id,
      message: message
    });
    this.props.getMessages(this.state.selectedClaim.id);
  };

  render() {
    if (!this.props.account) return null;

    return (
      <>
        <Card className={styles.card}>
          <AzureProfilePhoto
            objectId={this.props.account.accountIdentifier}
            className={styles.photo}
          />
          <Typography>{this.props.account.name}</Typography>
          <Typography variant="caption">
            {this.props.account.userName}
          </Typography>
        </Card>
        <Card className={styles.card}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Level</TableCell>
                <TableCell>Summary</TableCell>
                <TableCell>Date</TableCell>
                <TableCell></TableCell>
                <TableCell>Endorsed</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.claims.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No claims.
                  </TableCell>
                </TableRow>
              ) : (
                this.props.claims.map(claim => (
                  <React.Fragment key={claim.id}>
                    <TableRow>
                      <TableCell>{claim.level.name}</TableCell>
                      <TableCell>{claim.skillSummary}</TableCell>
                      <TableCell>{this.formatDate(claim.claimDate)}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => this.openEndorsementDialog(claim)}
                        >
                          <Badge
                            showZero={true}
                            badgeContent={claim.messages.length}
                            color="primary"
                          >
                            <CommentIcon />
                          </Badge>
                        </IconButton>
                      </TableCell>
                      <TableCell>
                        {claim.endorsed ? <CheckIcon /> : <CloseIcon />}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
          <EndorsementDialog
            open={this.state.endorsementDialogOpen}
            claim={this.state.selectedClaim}
            onClose={this.closeEndorsementDialog}
            onAddMessage={this.addMessage}
          />
        </Card>
      </>
    );
  }
}

function mapState({
  application: {
    userProfile: { claims }
  },
  auth: { account }
}) {
  return { account, claims };
}

function mapDispatch({ application }) {
  return {
    addMessage: application.addMessage,
    getMessages: application.getMessages
  };
}

export default connect(
  mapState,
  mapDispatch
)(Profile);
