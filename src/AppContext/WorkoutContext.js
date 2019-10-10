import React, { Component } from 'react';

export const WorkoutContext = React.createContext();

export class WorkoutProvider extends Component {
  ChangeWorkoutDate = workoutDate => {
    this.setState({
      workoutDate
    }, function(){
      //get workouts!
    })
  }
  state = {
    workoutDate: new Date(),
    routineName: 'Routine Name',
    tab: 'Routine'
  }
  render() {
    return (
      <WorkoutContext.Provider>
        {this.props.children}
      </WorkoutContext.Provider>
    );
  }
}
