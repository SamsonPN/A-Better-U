import React, { Component } from 'react';

class Dropdown extends Component {
  render() {
    const dropdownItems = this.props.levels.map((item, i) =>
      <a key={item.level}
        className="ActivityDropdownLi"
        href="#!"
        index={i}
        onClick={this.props.changeActivity.bind(this, i)}
      >
        {item.level}
      </a>
    )
    return (
      <div className="BMRDropdownWrapper">
        <div className="BMRDropdownDiv">{this.props.activity}</div>
        <ul className="BMRDropdown">
        {dropdownItems}
        </ul>
      </div>
    );
  }
}

class GoalDropdown extends Component {
  render() {
    const dropdownItems = this.props.goals.map((item, i) =>
      <a key={item.goal} className="GoalDropdownLi" href="#!" onClick={this.props.changeGoal.bind(this,i)} index={i}>{item.goal}</a>
    )
    return (
      <div className="BMRDropdownWrapper">
        <div className="BMRDropdownDiv">{this.props.goal}</div>
        <ul className="BMRDropdown">
        {dropdownItems}
        </ul>
      </div>
    );
  }
}


export {Dropdown, GoalDropdown};
