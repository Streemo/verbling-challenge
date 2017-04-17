import React from 'react';
import Dashboard from "./Dashboard";
import SearchBar from "./SearchBar";

export default class App extends React.Component {

  constructor(props, context){
    super(props, context)

    // could have included this & SearchBar in the dashboard, too

    this.state = {search: ""}
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Verbling Challenge</h1>
        <SearchBar onSearch={search => this.setState({search})}/>
        <Dashboard search={this.state.search}/>
      </div>
    )
  }

}
