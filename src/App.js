import React, { Component } from "react";
import "./App.css";

function loadCats() {
  return Promise.resolve({ Items: [{ catID: "1", name: "Gato" }] });
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cats: { Items: [] } };
  }

  componentDidMount() {
    loadCats().then(cats => {
      this.setState({ loading: false, cats });
    });
  }

  render() {
    const { loading, cats } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello Cats!</h1>
        </header>
        <ul>
          {loading ? (
            <li>Loading cats...</li>
          ) : (
            cats.Items.map(cat => <li>{cat.name}</li>)
          )}
        </ul>
      </div>
    );
  }
}

export default App;
