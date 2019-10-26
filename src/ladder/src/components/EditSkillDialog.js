import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

class EditSkillDialog extends React.Component {
  state = {
    summary: "",
    level: ""
  };

  changeLevel = evt => {
    this.setState({ level: evt.target.value });
  };

  setSummary = evt => {
    this.setState({ summary: evt.target.value });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.level !== this.props.level ||
      prevProps.summary !== this.props.summary
    )
      this.setState({ summary: this.props.summary, level: this.props.level });
  }

  render() {
    return (
      <Dialog
        onClose={this.closeDialog}
        open={this.props.open}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{this.props.confirmButtonLabel}</DialogTitle>
        <DialogContent>
          <Select onChange={this.changeLevel} value={this.state.level}>
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
          <TextField
            multiline
            rows={6}
            onChange={this.setSummary}
            label="Summary"
            fullWidth
            value={this.state.summary}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose}>Cancel</Button>
          <Button
            onClick={() =>
              this.props.onConfirm(this.state.level, this.state.summary)
            }
            variant="contained"
          >
            {this.props.confirmButtonLabel}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default EditSkillDialog;
