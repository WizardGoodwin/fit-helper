import React, { FC, useEffect, useState } from 'react';

import {
  IconButton,
  Snackbar as MaterialSnackbar,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

interface IProps {
  showSnackbar: boolean;
  message?: string;
}

const Snackbar: FC<IProps> = ({ showSnackbar, message = 'Something happened!' }) => {

  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (showSnackbar) setOpen(true);
  }, [showSnackbar]);

  const handleClose = () => setOpen(false);

  return (
    <MaterialSnackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      ]}
    />
  );
};

export default Snackbar;
