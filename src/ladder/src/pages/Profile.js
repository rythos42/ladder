import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import styles from "./Profile.module.css";
import AzureProfilePhoto from "../components/AzureProfilePhoto";

class Profile extends React.Component {
  formatDate = date => {
    return new Date(date).toDateString();
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
                        {claim.endorsed ? <CheckIcon /> : <CloseIcon />}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
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

export default connect(mapState)(Profile);
