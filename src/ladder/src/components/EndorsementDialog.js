import React from "react";
import { connect } from "react-redux";
import RichTextEditor from "react-rte";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import CommentIcon from "@material-ui/icons/Comment";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import styles from "./EndorsementDialog.module.css";

class EndorsementDialog extends React.Component {
  state = {
    showMore: false,
    editorState: RichTextEditor.createEmptyValue()
  };

  componentDidUpdate(prevProps) {
    if (!prevProps.claim.messages && !this.props.claim.messages) return;

    const wereNoMessagesNowSome =
      !prevProps.claim.messages && this.props.claim.messages;

    if (
      wereNoMessagesNowSome ||
      prevProps.claim.messages.length !== this.props.claim.messages.length
    )
      this.setState({ showMore: this.props.claim.messages.length > 5 });
  }

  formatDate = date => {
    return new Date(date).toDateString();
  };

  handleAddMessageClick = () => {
    this.props.onAddMessage(this.state.editorState.toString("markdown"));
    this.setState({ editorState: RichTextEditor.createEmptyValue() });
  };

  handleEndorseClick = () => {
    this.props.onEndorse(this.state.editorState.toString("markdown"));
    this.setState({ editorState: RichTextEditor.createEmptyValue() });
  };

  handleScroll = () => {
    this.setState({ showMore: false });
  };

  onEditorChange = editorState => {
    this.setState({ editorState });
  };

  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        open={this.props.open}
        maxWidth="md"
        fullWidth
      >
        <DialogContent className={styles.dialogContent}>
          <Card className={styles.card}>
            <Typography variant="caption">Claim </Typography>
            <Typography>{this.props.claim.claimEvidence}</Typography>
          </Card>
          {this.props.claim.messages && this.props.claim.messages.length > 0 && (
            <Card className={styles.card}>
              <div className={styles.comments} onScroll={this.handleScroll}>
                <div>
                  {this.state.showMore && (
                    <Chip
                      icon={<KeyboardArrowUpIcon />}
                      label="More"
                      className={styles.moreChip}
                    />
                  )}
                  {this.props.claim.messages.map(message => (
                    <div key={message.writtenOnDate}>
                      <CommentIcon />
                      <Typography variant="caption">
                        {message.authorUsername} -{" "}
                        {this.formatDate(message.writtenOnDate)}
                      </Typography>
                      <Typography>{message.text}</Typography>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
          <RichTextEditor
            value={this.state.editorState}
            onChange={this.onEditorChange}
            editorClassName={styles.editor}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button onClick={this.handleAddMessageClick} variant="outlined">
            Add Message
          </Button>

          {this.props.claim.fromUsername !== this.props.accountUsername && (
            <Button onClick={this.handleEndorseClick} variant="contained">
              Endorse
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

function mapState({ auth: { account } }) {
  return { accountUsername: account && account.userName };
}

export default connect(mapState)(EndorsementDialog);
