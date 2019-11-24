import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class RoutineHeader extends Component {
  static contextType = WorkoutContext;
  render() {
    const {currentRoutine, ChangeRoutineName, StoreExercises} = this.context;
    const name = currentRoutine.name;
    const {collection} = this.props.match.params;
    return (
          <div id="RoutineHeader">
            <div id="RoutineHeaderWrapper">
              <textarea
                id="RoutineName"
                placeholder={name || 'Routine'}
                onKeyPress={(e) => e.key === 'Enter' ? e.preventDefault() : null}
                onChange={(e) => ChangeRoutineName(e)}
                maxLength="25">
              </textarea>
              <Link
                id="RoutineFinish"
                to="/workout"
                onClick={() => StoreExercises(collection)}>
                Finish
              </Link>
            </div>
          </div>
    );
  }

}

export default RoutineHeader;
