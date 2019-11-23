import React, { Component } from 'react';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';

class BodyOptions extends Component {
  static contextType = AddExerciseContext;
  render() {
    const {muscles, ShowValue} = this.context;
    const muscleItems = muscles.map(item =>
      <BodyOptionItem
        key={item}
        name={item}
        ShowValue={ShowValue}
        index={0}
      />
    )
    return (
      <div className="AddExerciseOptions">
        <div
          className="AeViews">
          <p>Muscles</p>
        </div>
        <ul className="AeViewsDropdown">
          {muscleItems}
        </ul>
      </div>
    );
  }
}

export default BodyOptions;

class BodyOptionItem extends Component {
  render() {
    const {name, ShowValue, index} = this.props;
    return (
      <div
        className="AeOptionItem"
        onClick={(e) => ShowValue(e, index)}>
        {name}
      </div>
    );
  }
}
