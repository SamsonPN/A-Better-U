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
        textRef={this.AeViews}
      />
    )
    return (
      <div className="AddExerciseOptions">
        <div
          className="AeViews"
          ref={element => this.AeViews = element}>
          Muscles
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
    const {name, ShowValue, textRef} = this.props;
    return (
      <div
        className="AeOptionItem"
        onClick={(e) => ShowValue(e, textRef)}>
        {name}
      </div>
    );
  }
}
