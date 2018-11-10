import React, { Component } from "react";
import "./App.css";
import { __await } from "tslib";

async function loadCats() {
  let url = "/api/cats";
  let result = await fetch(url);
  let json = await result.json();
  console.log("GET THEM CATTTTTS", json);
  return json;
}

async function createCat(name) {
  let url = "/api/cats";
  let result = await fetch(url, { method: "POST", body: JSON.stringify({catID: '' + Math.random(), name: name})});
  let json = await loadCats()
  return json
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true, cats: { Items: [] }, name: "" };
  }

  componentDidMount() {
    loadCats().then(cats => {
      this.setState({ loading: false, cats });
    });
  }

  handleCreateCat = e => {
    e.preventDefault();
    createCat(this.state.name).then((cats) = >{
      this.setState({cats})
    })
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { loading, cats, name } = this.state;

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
        <form onSubmit={this.handleCreateCat}>
          <p>
            <label>
              Cat Name:{" "}
              <input name="name" value={name} onChange={this.handleChange} />
            </label>
          </p>
          <p>
            <button>Add Cat</button>
          </p>
        </form>
      </div>
    );
  }
}

export default App;
