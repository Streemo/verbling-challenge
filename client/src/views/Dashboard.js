import React from 'react';
import List from "./List";
import Controls from "./Controls";
import Item from "./Item";
import { items } from "../fixtures";

export default class Dashboard extends React.Component {

  constructor(props,context){
    super(props,context)

    // Store item toggle state in parent as parent needs to control the state.

    //   Alternatively, could keep state on child component too
    //   Would require using componentWillReceive props on the child.
    //   Can be buggy, instead make children dumb components.

    // init the fixture data with isOpen state.
    // cache lowerCaseText for performance
    this.state = {
      items: items.map(
        i => ({
          id:i.id, 
          text:i.text, 
          lowerCaseText: i.text.toLowerCase(), 
          isOpen:false
        })
      )
    }
  }

  _renderMatchingItems(search){
    return this.state.items.reduce((matching, item) => {

      // only add matching (case insensitive) elements to the result set (or all if no search entered)
      if (!search || item.lowerCaseText.indexOf(search.toLowerCase()) > -1){
        matching.push(
          <Item 
            key={item.id} 
            item={item}
            updateItemState={(newState,id)=>this._updateItemState(newState,id)}
          />
        )
      }
      return matching;
    }, [])
  }

  _updateItemState(newState, id){
    this.setState({items: this.state.items.map(i => {
      let isOpen = i.isOpen;

      // if id specified, only update the singleton

      if (!id || id === i.id)
        isOpen = newState === "open" ? true : newState === "close" ? false : !isOpen
      return {id:i.id, text:i.text, isOpen, lowerCaseText: i.lowerCaseText};
    })})
  }

  render() {
    const search = this.props.search;

    // have a smart empty-message.
    const emptyMessage = search ? "No items match your search :(" : "No items! Add some below :)";

    return (
      <div>
        <List emptyMessage={emptyMessage}>
          {this._renderMatchingItems(search)}
        </List>
        <Controls 
          onNewItem={newItem => this.setState({items:[newItem].concat(this.state.items)})} 
          onToggleState={toggleState => this._updateItemState(toggleState)}/>
      </div>
    )
  }

}
