import React from 'react';
import { guid } from "../helpers";

const toggleButtons = [
  {name: "Open All", state:"open"},
  {name: "Close All", state:"close"},
  {name: "Toggle All", state: "toggle"}
]

export default class Controls extends React.Component {

  _addItem(){
    const text = window.prompt("Please add a new item!")
    if (text != null){
      this.props.onNewItem({id: guid(), text, isOpen:false, lowerCaseText:text.toLowerCase()})
    }
  }

  render() {
    return (
      <div className="buffer-top">
        <div className="pull-left">
          {toggleButtons.map(b => (
            <button className="button" key={b.state} onClick={() => this.props.onToggleState(b.state)}>
              {b.name}
            </button>
          ))}
        </div>
        <div className="pull-right">
          <button className="button" onClick={()=> this._addItem()}>Add</button>
        </div>
      </div>
    )
  }

}
