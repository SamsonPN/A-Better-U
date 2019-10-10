import React, { Component } from 'react';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';

class ExerciseTypeOptions extends Component {
  static contextType = AddExerciseContext;
  ShowValue = (e) => {
    this.AeViews.textContent = e.target.textContent;
    this.context.SearchByCategory();
  }

  render() {
    const types = this.context.types.map(type =>
      <EtOptionItem key={type} name={type} ShowValue={this.ShowValue}/>
    )
    return (
      <div className="AddExerciseOptions">
        <div
          className="AeViews"
          ref={element => this.AeViews = element}>
          Exercise Type
        </div>
        <ul className="AeViewsDropdown">
          {types}
        </ul>
      </div>

    );
  }
}

export default ExerciseTypeOptions;

class EtOptionItem extends Component {
  render() {
    const {name, ShowValue} = this.props;
    return (
      <div
        className="AeOptionItem"
        onClick={(e) => ShowValue(e)}
      >
        {name}
      </div>
    );
  }
}
