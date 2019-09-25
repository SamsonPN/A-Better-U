import React, { Component } from 'react';

class BodyOptions extends Component {
  ShowValue = (id) => {
    document.getElementsByClassName('AeViews')[0].textContent = document.getElementById(id).textContent;
    this.props.searchCategory();
  }

  render() {
    const muscles = this.props.muscles.map(item =>
      <BodyOptionItem key={item} name={item} ShowValue={this.ShowValue} />
    )
    return (
      <div className="AddExerciseOptions">
        <div className="AeViews">Muscles</div>
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
    return (
      <div className="AeOptionItem" id={this.props.name} onClick={() => this.props.ShowValue(this.props.name)}>{this.props.name}</div>
    );
  }
}
