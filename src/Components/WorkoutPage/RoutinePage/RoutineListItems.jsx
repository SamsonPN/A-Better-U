import React, { Component } from 'react';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class RoutineListItems extends Component {
  render() {
    const {muscle, name, type} = this.props;
    return (
      <WorkoutContext.Consumer>
        { ({ RemoveExercise }) => (
          <div className="RoutineLi">
            <p
              className="RoutineLiInfo">
              {type} {name} ({muscle})
            </p>
            <p
              className="RoutineLiInfo
              RoutineLiDelBtn"
              onClick={() => RemoveExercise({...this.props})}>
              X
            </p>
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default RoutineListItems;
