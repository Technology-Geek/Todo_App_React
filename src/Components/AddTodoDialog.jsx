import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Zoom,
} from '@material-ui/core';

function AddTodoDialog({ open, handleOpen, handleConfirm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleConfirm('Add', {
      [e.target.body.name]: e.target.body.value,
      isOpen: open,
    });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Zoom}
      onClose={() => handleOpen(open)}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add Todo</DialogTitle>
        <DialogContent>
          <DialogContentText>Add New Todo Item</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="body"
            label="Todo:"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleOpen(open)} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddTodoDialog.propTypes = {
  open: PropTypes.bool,
  handleOpen: PropTypes.func,
  handleConfirm: PropTypes.func,
};

export default AddTodoDialog;
