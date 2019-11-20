import React, { Component } from 'react';
import {ActivityDropdown, GoalDropdown} from './BMRDropdown';

export class TopRow extends Component {
  render() {
    const {textareas} = this.props;
    return (
      <div className="userInfoRow">
        <div className="userInfoWrapper">
          <p className="userTraits">Sex</p>
          {textareas[0]}
        </div>
        <div className="userInfoWrapper">
          <p className="userTraits">Age</p>
          {textareas[1]}
        </div>
      </div>
    );
  }
}


export class MiddleRow extends Component {
  render() {
    const {textareas} = this.props;
    return (
      <div className="userInfoRow">
        <div className="userInfoWrapper">
          <p className="userTraits">Height</p>
          <div id="ftInWrapper">
            {textareas[2]}
            {textareas[3]}
          </div>
        </div>
        <div className="userInfoWrapper">
          <p className="userTraits">Weight</p>
          {textareas[4]}
        </div>
      </div>
    );
  }
}

export class BottomRow extends Component {
  render() {
    return (
      <div className="userInfoRow">
        <div className="userInfoWrapper">
          <p className="userTraits">Activity</p>
          <ActivityDropdown />
        </div>
        <div className="userInfoWrapper">
          <p className="userTraits">Goal</p>
          <GoalDropdown />
        </div>
      </div>
    );
  }
}
