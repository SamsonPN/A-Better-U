import React, { Component } from 'react';

export const WorkoutContext = React.createContext();

class WorkoutProvider extends Component {

  render() {
    return (
      <WorkoutContext.Provider>
        {this.props.children}
      </WorkoutContext.Provider>
    );
  }
}
