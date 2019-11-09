import React from "react";
import { connect } from "react-redux";

import styles from "./AzureProfilePhoto.module.css";

class AzureProfilePhoto extends React.Component {
  render() {
    const src = `${this.props.profilePhotoUrl}?objectId=${this.props.objectId}`;
    return <img className={styles.photo} alt="User profile" src={src} />;
  }
}

function mapState({ config: { profilePhotoUrl } }) {
  return { profilePhotoUrl };
}

export default connect(mapState)(AzureProfilePhoto);
