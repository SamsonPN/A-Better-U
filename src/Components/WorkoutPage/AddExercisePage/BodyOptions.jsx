import React, { Component } from 'react';
import {AddExerciseContext} from '../../../AppContext/ExportContexts';

class BodyOptions extends Component {
  static contextType = AddExerciseContext;
  ShowValue = (e) => {
    this.AeViews.textContent = e.target.textContent;
    this.context.SearchByCategory();
  }

  render() {
    const muscles = this.context.muscles.map(item =>
      <BodyOptionItem key={item} name={item} ShowValue={this.ShowValue} />
    )
    return (
      <div className="AddExerciseOptions">
        <div className="AeViews" ref={element => this.AeViews = element}>Muscles</div>
        <ul className="AeViewsDropdown">
          {muscles}
        </ul>
      </div>
    );
  }
}

export default BodyOptions;

class BodyOptionItem extends Component {
  render() {
    const {name, ShowValue} = this.props;
    return (
      <div
        className="AeOptionItem"
        onClick={(e) => ShowValue(e)}>
        {name}
      </div>
    );
  }
}
