import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material';

const ConfirmDialog = ({ open, onClose, onConfirm, title, message, loading = false }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>Cancelar</Button>
        <Button onClick={onConfirm} variant="contained" color="error" disabled={loading}>
          {loading ? <CircularProgress size={20} /> : 'Excluir'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;