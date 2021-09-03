import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { IoAdd } from "react-icons/io5";
import "./style.css";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import api from "../../api";
export default function Buttons() {
  const [newNote, setNewNote] = useState({
    title: "",
    link: "",
    description: "",
    tags: "",
  });

  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [input, setInput] = useState("");
  const [tags, setTags] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInput = (e) => {
    console.log(e);

    setNewNote({
      ...newNote,
      [e.target.name]: e.target.value,
    });

    console.log(newNote);
  };

  // const add = () => {
  //   const res = api.post(`http://localhost:3000/tools`);
  // };

  const deleteTag = (index) => {
    setTags((prevState) => prevState.filter((tag, i) => i !== index));
  };

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const onKeyDown = (e) => {
    const { key } = e;
    const trimmedInput = input.trim();
    console.log(tags);

    if (key === "," && trimmedInput.length && !tags.includes(trimmedInput)) {
      e.preventDefault();
      setTags((prevState) => [...prevState, trimmedInput]);
      setInput("");
    }

    if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();
      e.preventDefault();
      setTags(tagsCopy);
      setInput(poppedTag);
    }

    setIsKeyReleased(false);
  };

  const onKeyUp = () => {
    setIsKeyReleased(true);
    console.log(tags);
  };

  const onSubmitTool = async () => {
    newNote.tags = tags;

    const res = await api.post(process.env.REACT_APP_BASE_URL, newNote);
    console.log(res);
    setOpen(false);
    window.location.reload();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        <IoAdd className="button-icon" />
        Add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="card-add-tool ">
        <div className="card-add-tool ">
          <DialogTitle id="alert-dialog-title">
            <IoAdd className="button-icon" />
            {"Add new tool"}
          </DialogTitle>
          <DialogContent className="dialog-container">
            <DialogContentText id="alert-dialog-description">
              <div className="dialog-card">
                <TextField
                  id="outlined-search"
                  label="Tool Name"
                  type="search"
                  variant="outlined"
                  fullWidth
                  name="title"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="dialog-card">
                <TextField
                  id="outlined-search"
                  label="Tool Link"
                  type="search"
                  variant="outlined"
                  fullWidth
                  name="link"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="dialog-card">
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  label="Tool Description"
                  rows={4}
                  variant="outlined"
                  fullWidth
                  name="description"
                  onChange={(e) => handleInput(e)}
                />
              </div>
              <div className="dialog-card">
                <TextField
                  id="outlined-search"
                  label="Tags"
                  type="search"
                  variant="outlined"
                  fullWidth
                  name="tags"
                  value={input}
                  placeholder="Enter a tag"
                  onKeyDown={onKeyDown}
                  onKeyUp={onKeyUp}
                  onChange={onChange}
                  // onKeyUp={(e) => keyUpTag(e)}
                />
                {tags.map((tag, index) => (
                  <p className="tag">
                    {tag}
                    <button onClick={() => deleteTag(index)}>x</button>
                  </p>
                ))}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={onSubmitTool} refresh="true">
              Add tool
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}
