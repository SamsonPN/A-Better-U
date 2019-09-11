import React, { Component } from 'react';

class ExerciseTypeOptions extends Component {
  ShowValue = (id) => {
    document.getElementsByClassName('AeViews')[1].textContent = document.getElementById(id).textContent;
    this.props.searchCategory();
  }

  render() {
    const types = this.props.types.map(type =>
      <EtOptionItem key={type} name={type} ShowValue={this.ShowValue}/>
    )
    return (
      <div className="AddExerciseOptions">
        <div className="AeViews">Exercise Type</div>
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
    return (
      <div
        className="AeOptionItem"
        id={this.props.name}
        onClick={this.props.ShowValue.bind(this, this.props.name)}
      >
      {this.props.name}
      </div>
    );
  }
}
