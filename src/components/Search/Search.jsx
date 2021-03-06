import React, { Component } from "react";
import Buttons from "../Button/Button";
import { FaSearch } from "react-icons/fa";
// import Grid from "@material-ui/core/Grid";
// import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "./style.css";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
    };
  }

  render() {
    return (
      <div className="container">
        <div className="search-container">
          <div>
            {/* <Grid container spacing={1} alignItems="flex-end">
              <Grid item>
                <FaSearch className="search-icon" />
              </Grid>
              <Grid item>
                <TextField
                  variant="filled"
                  label="search"
                  onChange={this.props.handleTextSearch}
                />
              </Grid>
            </Grid> */}

            <FormControl className="teste">
              <InputLabel htmlFor="input-with-icon-adornment">
                Search
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                onChange={this.props.handleTextSearch}
                startAdornment={
                  <InputAdornment position="start">
                    <FaSearch />
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
          <div className="search-checklist">
            <FormControlLabel
              value="end"
              control={<Checkbox color="primary" />}
              label="Search in tags only"
              labelPlacement="end"
              checked={this.props.isChecked}
              onChange={this.props.toggleChange}
            />
          </div>
        </div>
        <Buttons
        //  add={this.props.add.bind(this)}
        />
      </div>
    );
  }
}

export default Search;
