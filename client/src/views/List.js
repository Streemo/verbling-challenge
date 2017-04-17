import React from 'react';

export default class Item extends React.Component {

  render() {
    const children = this.props.children
    return (
      <div className="list buffer-top">
        {children.length ? 
          children : 
          <div className="sorry-message">
            {this.props.emptyMessage}
          </div>
        }
      </div>
    )
  }

}
