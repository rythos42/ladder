import React from "react";
import { connect } from "react-redux";

class AzureProfilePhoto extends React.Component {
  state = {
    profilePhotoData: null
  };

  async componentDidMount() {
    const profilePhotoData = await this.props.getProfilePhotoData(
      this.props.objectId
    );
    this.setState({ profilePhotoData });
  }

  render() {
    if (!this.state.profilePhotoData) return null;

    if (this.state.profilePhotoData.type !== "image/jpeg")
      return this.props.objectId;

    const blobUrl = window.URL.createObjectURL(this.state.profilePhotoData);
    return (
      <img
        title={this.props.objectId}
        alt="User profile"
        src={blobUrl}
        height={this.props.height || 120}
        width={this.props.width || 120}
      />
    );
  }
}

function mapDispatch(dispatch) {
  return { getProfilePhotoData: dispatch.auth.getProfilePhotoData };
}

export default connect(
  null,
  mapDispatch
)(AzureProfilePhoto);
