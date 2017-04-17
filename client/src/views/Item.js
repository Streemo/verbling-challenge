import React from 'react';

export default class Item extends React.Component {
  render() {
    const p = this.props;
    return (
      <div 
        className={`item${p.item.isOpen ? "-opened" : "-closed"} item`} 
        onClick={()=>p.updateItemState(p.item.isOpen ? "close" : "open", p.item.id)}>
        {p.item.text}
      </div>
    )
  }

}
