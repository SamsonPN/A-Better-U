import React, { Component } from 'react';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';

class ExerciseTypeOptions extends Component {
  static contextType = AddExerciseContext;
  render() {
    const {ShowValue, types} = this.context;
    const typeItems = types.map(type =>
      <EtOptionItem
        key={type}
        name={type}
        ShowValue={ShowValue}
        textRef={this.AeViews}/>
    )
    return (
      <div className="AddExerciseOptions">
        <div
          className="AeViews"
          ref={element => this.AeViews = element}>
          Exercise Type
        </div>
        <ul className="AeViewsDropdown">
          {typeItems}
        </ul>
      </div>

    );
  }
}

export default ExerciseTypeOptions;

class EtOptionItem extends Component {
  render() {
    const {name, ShowValue, textRef} = this.props;
    return (
        <div
          className="AeOptionItem"
          onClick={(e) => ShowValue(e, textRef)}
        >
          {name}
        </div>
    );
  }
}
