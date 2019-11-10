import React from "react";
import { connect } from "react-redux";

import styles from "./AzureProfilePhoto.module.css";

class AzureProfilePhoto extends React.Component {
  render() {
    if (!this.props.profilePhotoData) return null;

    const blobUrl = window.URL.createObjectURL(this.props.profilePhotoData);
    return <img className={styles.photo} alt="User profile" src={blobUrl} />;
  }
}

function mapState({ auth: { profilePhotoData } }) {
  return { profilePhotoData };
}

export default connect(mapState)(AzureProfilePhoto);
