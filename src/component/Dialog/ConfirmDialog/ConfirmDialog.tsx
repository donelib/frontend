import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ConfirmDialogProps } from "./ConfirmDialog.type";

export default function ConfirmDialog({
  isShow,
  title,
  description,
  positiveOnClick,
  negativeOnClick,
}: ConfirmDialogProps) {
  return (
    <Dialog
      open={isShow}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={positiveOnClick}>확인</Button>
        <Button onClick={negativeOnClick} autoFocus>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
