import React from "react";
import { connect } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";

import styles from "./Profile.module.css";
import AzureProfilePhoto from "../components/AzureProfilePhoto";

class Profile extends React.Component {
  render() {
    if (!this.props.account) return null;

    return (
      <Card className={styles.card}>
        <AzureProfilePhoto
          objectId={this.props.account.accountIdentifier}
          className={styles.photo}
        />
        <Typography>{this.props.account.name}</Typography>
        <Typography variant="caption">{this.props.account.userName}</Typography>
      </Card>
    );
  }
}

function mapState({ auth: { account } }) {
  return { account };
}

export default connect(mapState)(Profile);
