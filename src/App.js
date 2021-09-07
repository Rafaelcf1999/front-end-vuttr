import React, { Component } from "react";
import Search from "../src/components/Search/Search";
import Notes from "./components/Notes/Notes";
import Title from "./components/Title/Title";
import "./assets/app.css";
import api from "../src/api";

class App extends Component {
  constructor() {
    super();

    this.state = {
      notes: [],
      isChecked: true,
    };
  }

  async componentDidMount() {
    const res = await api.get(process.env.REACT_APP_BASE_URL);

    const newArrayNotes = [...this.state.notes, ...res.data];
    const newState = {
      notes: newArrayNotes,
    };

    this.setState(newState);
  }

  // search notes by tags and words
  async handleTextSearch(evento) {
    const search = evento.target.value;
    const res = await api.get(
      `${process.env.REACT_APP_BASE_URL}?${
        this.isChecked ? `tags_like=${search}` : `q=${search}`
      }`
    );
    this.setState({
      notes: res.data,
    });
    console.log("search", res.data);
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
  };

  render() {
    return (
      <div>
        <Title />
        <Search
          handleTextSearch={this.handleTextSearch.bind(this)}
          isChecked={this.state.isChecked}
          toggleChange={this.toggleChange}
        />
        <Notes notes={this.state.notes} delete={this.deleteNote} />
      </div>
    );
  }
}

export default App;
