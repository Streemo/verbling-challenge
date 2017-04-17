import React from 'react';
import List from "./List";
import Controls from "./Controls";
import Item from "./Item";
import { items } from "../fixtures";

export default class Dashboard extends React.Component {
  constructor(props,context){
    super(props,context)

    // Store item toggle state in parent as parent needs to control the state.

    // Alternatively, could keep state on child component AND pass props of state from parent
    //   This would require using componentWillReceive props on the child.
    //   This can be buggy and brittle, instead make children dumb components.
    //   Let React reconcile the state to avoid bugs.

    // init the fixture data with isOpen state.
    this.state = {items: items.map(i => ({id:i.id, text:i.text, isOpen:false}))}
  }
  _renderMatchingItems(search){
    return this.state.items.reduce((matching, item) => {

      // only add matching elements to the result set (or all if no search entered)
      // let's make it case-insensitive 

      if (!search || item.text.toLowerCase().indexOf(search.toLowerCase()) > -1){
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
      return {id:i.id, text:i.text, isOpen};
    })})
  }
  render() {
    const search = this.props.search;

    // have a smart empty-message.

    return (
      <div>
        <List emptyMessage={search ? "No items match your search :(" : "No items! Add some below :)"}>
          {this._renderMatchingItems(search)}
        </List>
        <Controls 
          onNewItem={newItem => this.setState({items:[newItem].concat(this.state.items)})} 
          onToggleState={toggleState => this._updateItemState(toggleState)}/>
      </div>
    )
  }

}
