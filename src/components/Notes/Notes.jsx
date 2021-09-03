import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import "./style.css";
import { FaTrash, FaTimes } from "react-icons/fa";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import api from "../../api";

export default function Notes(props) {
  const [openConfirm, setConfirmOpen] = React.useState(false);
  const [noteId, setNoteId] = React.useState();

  const handleConfirmOpen = (event) => {
    setConfirmOpen(true);
    setNoteId(event);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };
  const notes = props.notes;

  const handleConfirmCloseDelete = async (event) => {
    await api.delete(`${process.env.REACT_APP_BASE_URL}/${event}`);
    setConfirmOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <div>
        {!notes && !notes.lenght
          ? null
          : notes.map((note, index) => {
              return (
                <div className="card-containers">
                  <Card className="card-notes" key={index}>
                    <CardContent key={index}>
                      <div className="card-title">
                        <h3>{note.title}</h3>
                        <div className="card-remove">
                          <FaTrash
                            open={openConfirm}
                            onClick={() => {
                              handleConfirmOpen(note.id);
                            }}
                            className="card-remove-icon"
                            color="primary"
                            autoFocus
                          />

                          <Dialog
                            open={openConfirm}
                            onClose={handleConfirmClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <div className="card-add-tool "></div>
                            <DialogTitle id="alert-dialog-title">
                              <FaTimes className="card-icon-remove" />
                              {"Remove Tool"}
                            </DialogTitle>
                            <DialogContent className="dialog-container">
                              <DialogContentText id="alert-dialog-description">
                                Are you Sure you want remove hotel?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button onClick={handleConfirmClose}>
                                Cancel
                              </Button>
                              <Button
                                onClick={() =>
                                  handleConfirmCloseDelete(noteId)
                                }>
                                {console.log(noteId)}
                                Yes,remove
                              </Button>
                            </DialogActions>
                          </Dialog>
                          <h5>Remove</h5>
                        </div>
                      </div>
                      <p>{note.description}</p>

                      <p key={index} className="card-tags">
                        {note.tags.map((tag, index) => {
                          return (
                            <div key={index}>
                              <strong>#{tag}</strong>
                            </div>
                          );
                        })}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
      </div>
    </div>
  );
}
