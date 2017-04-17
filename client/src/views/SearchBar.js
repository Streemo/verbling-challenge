import React from 'react';

export default class SearchBar extends React.Component {

  render() {
    return (
      <div>
        <input 
          className="full-width search-bar"
          onChange={e => this.props.onSearch(e.target.value)} 
          type="text" 
          placeholder="Look it up!"
        />
      </div>
    )
  }

}
