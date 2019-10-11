import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {WorkoutContext} from '../../../AppContext/ExportContexts';

class RoutineHeader extends Component {
  static contextType = WorkoutContext;

  render() {
    return (
      <WorkoutContext.Consumer>
        { ({ currentRoutine, ChangeRoutineName }) => (
          <div id="RoutineHeader">
            <div id="RoutineHeaderWrapper">
              <textarea
                id="RoutineName"
                defaultValue={currentRoutine.name || 'Routine Name'}
                onKeyPress={(e) => e.key === 'Enter' ? e.preventDefault() : null}
                onChange={(e) => ChangeRoutineName(e)}
                maxLength="25">
              </textarea>
              <Link id="RoutineFinish" to="/workout" onClick={this.props.store}>Finish</Link>
            </div>
          </div>
        )}
      </WorkoutContext.Consumer>
    );
  }

}

export default RoutineHeader;
