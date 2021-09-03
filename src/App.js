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

  async handleText(evento) {
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

  // async addNotes(event, event1, event2, event3) {
  //   const Headers = {'Content-Type':'application/json'},
  //   const article = {
  //     body:JSON.stringify({
  //     name:event,
  //     link:event1,
  //     description:event2,
  //     tags:event3
  //   })
  //   };
  //   const res = await api.post(`http://localhost:3000/tools`,article,Headers);
  //   console.log("submite", res);
  // }

  async deleteNote() {
    // let arrayDeNotas = this.state.notes;
    // const id = event.target.value;
    // const res = await api.delete(`http://localhost:3000/tools/${id}`);
    // arrayDeNotas.splice(index);
    console.log("delete");
  }

  render() {
    return (
      <div>
        <Title />
        <Search
          handleText={this.handleText.bind(this)}
          isChecked={this.state.isChecked}
          toggleChange={this.toggleChange}
          // add={this.addNotes.bind(this)}
        />
        <Notes notes={this.state.notes} delete={this.deleteNote} />
      </div>
    );
  }
}

export default App;
