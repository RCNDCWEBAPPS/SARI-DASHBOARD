import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Controls from "./controls/Controls";
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5),
  },
  dialogContent: {
    textAlign: "center",
  },
  dialogAction: {
    justifyContent: "center",
  },
  titleIcon: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
      cursor: "default",
    },
    "& .MuiSvgIcon-root": {
      fontSize: "8rem",
    },
  },
}));

export default function ConfirmDialog(props) {
  const { confirmDialogNew, setConfirmDialogNew } = props;
  const classes = useStyles();

  return (
    <Dialog open={confirmDialogNew.isOpen} classes={{ paper: classes.dialog }}>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h6">{confirmDialogNew.title}</Typography>
        <Typography variant="subtitle2">{confirmDialogNew.subTitle}</Typography>
      </DialogContent>
      <DialogActions className={classes.dialogAction}>
        <Controls.Button
          text="No"
          color="inherit"
          onClick={() => setConfirmDialogNew({ ...confirmDialogNew, isOpen: false })}
        />
        <Controls.Button
          text="Yes"
          color=""secondary
          onClick={confirmDialogNew.onConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
