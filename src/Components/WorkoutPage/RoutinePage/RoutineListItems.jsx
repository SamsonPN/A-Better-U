import React, { Component } from 'react';

class RoutineListItems extends Component {

  render() {
    const {name, type} = this.props;
    return (
      <div className="RoutineLi">
        <p className="RoutineLiInfo">{name} ({type})</p>
        <p className="RoutineLiInfo RoutineLiDelBtn" onClick={this.props.delete.bind(this, name, type)}>X</p>
      </div>
    );
  }

}

export default RoutineListItems;
