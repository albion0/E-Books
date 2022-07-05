import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toastNotification } from "../../../utils/toastNotification";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { buyBook } from "../../../store/actions/books";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({ price, bookId }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useDispatch();

  const userResponse = useSelector(({ auth }) => auth.getOne);
  const booksResponse = useSelector(({ books }) => books.getOne);

  const handleConfirm = () => {
    const userId = userResponse.data.user._id;
    const userBalance = +userResponse.data.user.credits;

    if(userBalance >= price) {
      dispatch(buyBook({ bookId, userId }));
      setOpen(false);
      toastNotification("success", "You've bought the book");
    } else {
      toastNotification("error", "You don't have enough credits!");
      setOpen(false);
    }
  }

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">Buy</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure?
          </Typography>
          <br/>
          <Button variant="contained" style={{marginRight: '20px'}} onClick={handleConfirm}>Confirm</Button>
          <Button variant="contained" onClick={handleClose}>Cancel</Button>
        </Box>
      </Modal>
    </div>
  );
}