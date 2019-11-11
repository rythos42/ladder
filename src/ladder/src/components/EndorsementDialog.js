import React from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Chip from "@material-ui/core/Chip";
import CommentIcon from "@material-ui/icons/Comment";
import AddCommentIcon from "@material-ui/icons/AddComment";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

import styles from "./EndorsementDialog.module.css";

class EndorsementDialog extends React.Component {
  state = {
    message: "",
    showMore: false
  };

  componentDidUpdate(prevProps) {
    if (prevProps.claim.messages.length !== this.props.claim.messages.length)
      this.setState({ showMore: this.props.claim.messages.length > 5 });
  }

  setMessage = evt => {
    this.setState({ message: evt.target.value });
  };

  formatDate = date => {
    return new Date(date).toDateString();
  };

  addMessage = () => {
    this.props.onAddMessage(this.state.message);
    this.setState({ message: "" });
  };

  handleScroll = () => {
    this.setState({ showMore: false });
  };

  render() {
    return (
      <Dialog
        onClose={this.props.onClose}
        open={this.props.open}
        maxWidth="md"
        fullWidth
      >
        <DialogContent>
          <Card className={styles.card}>
            <Typography variant="caption">Claim </Typography>
            <Typography>{this.props.claim.claimEvidence}</Typography>
          </Card>
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
          <TextField
            variant="outlined"
            value={this.state.message}
            onChange={this.setMessage}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="add comment"
                    onClick={this.addMessage}
                  >
                    <AddCommentIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>

          {this.props.claim.fromUsername !== this.props.accountUsername && (
            <Button
              onClick={() => this.props.onEndorse(this.state.message)}
              variant="contained"
            >
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
