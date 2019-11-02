import React from "react";
import { connect } from "react-redux";
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
    levelId: -1
  };

  changeLevelId = evt => {
    this.setState({ levelId: evt.target.value });
  };

  setSummary = evt => {
    this.setState({ summary: evt.target.value });
  };

  componentDidUpdate(prevProps) {
    if (
      prevProps.levelId !== this.props.levelId ||
      prevProps.summary !== this.props.summary
    )
      this.setState({
        summary: this.props.summary,
        levelId: this.props.levelId
      });
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
          <Select onChange={this.changeLevelId} value={this.state.levelId}>
            {this.props.levels.map(level => (
              <MenuItem key={level.id} value={level.id}>
                {level.name}
              </MenuItem>
            ))}
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
              this.props.onConfirm(this.state.levelId, this.state.summary)
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

function mapState({ application: { levels } }) {
  return { levels };
}

export default connect(mapState)(EditSkillDialog);
