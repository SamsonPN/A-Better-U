import React, { Component } from 'react';

class RoutineListItems extends Component {

  render() {
    return (
      <div className="RoutineLi">
        <p className="RoutineLiInfo">{this.props.name} ({this.props.type})</p>
        <p className="RoutineLiInfo RoutineLiDelBtn">X</p>
      </div>
    );
  }

}

export default RoutineListItems;
