import React, { Component } from 'react';
import {CalculatorContext} from '../../../AppContext/ExportContexts';

export class ActivityDropdown extends Component {
  static contextType = CalculatorContext;
  render() {
    const {HandleDropdownChange, levels, user} = this.context;
    const dropdownItems = levels.map(item =>
      <a
        key={item.name}
        className="BMRDropdownLi"
        href="#!"
        onClick={() => HandleDropdownChange('activity', item)}
      >
        {item.name}
      </a>
    )
    return (
      <div className="BMRDropdownWrapper">
        <div className="BMRDropdownDiv">{ user.activity.name }</div>
        <ul className="BMRDropdown">
          {dropdownItems}
        </ul>
      </div>
    );
  }
}

export class GoalDropdown extends Component {
  static contextType = CalculatorContext;
  render() {
    const {goals, HandleDropdownChange, user} = this.context;
    const dropdownItems = goals.map(item =>
      <a
        key={item.name}
        className="BMRDropdownLi"
        href="#!"
        onClick={() => HandleDropdownChange('goal', item)}
      >
        {item.name}
      </a>
    )
    return (
      <div className="BMRDropdownWrapper">
        <div className="BMRDropdownDiv">{ user.goal.name }</div>
        <ul className="BMRDropdown">
          {dropdownItems}
        </ul>
      </div>
    );
  }
}
