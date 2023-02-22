import { Component } from "react";
import "./App.css";
import CardList from "./components/card-list/card-list.component";
import SearchBox from "./components/search-box/search-box.compenent";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchFieldTerm: "",
    };
  }

  onSearchChange = (event) => {
    const term = event.target.value.toLocaleLowerCase();
    this.setState(() => {
      return { searchFieldTerm: term };
    });
  };

  // First Render
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) =>
        this.setState(() => {
          return { monsters: users };
        })
      );
  }

  render() {
    const { searchFieldTerm, monsters } = this.state;
    const { onSearchChange } = this;
    const filteredMonsters = monsters.filter((monster) => {
      return monster.name.toLocaleLowerCase().includes(searchFieldTerm);
    });
    return (
      <div className="App">
        <h1 className="app-title">Monsters Cat</h1>
        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="search monster"
          className="monster-search-box"
        />
        {/* {filteredMonsters.map((monster) => {
        return (
          <div key={monster.id}>{monster.name}</div>
        )
      })} */}
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
