import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class RoutineHeader extends Component {
  PreventEnter = (e) => {
    if(e.key === 'Enter'){
      e.preventDefault()
    }
  }
  render() {
    return (
      <div id="RoutineHeader">
        <div id="RoutineHeaderWrapper">
          <textarea
            id="RoutineName"
            defaultValue={this.props.RoutineName}
            onKeyPress={this.PreventEnter}
            onChange={this.props.redirect}
            maxLength="25">
          </textarea>

          {this.props.finished ?
            <Link id="RoutineFinish" to="/workout" onClick={this.props.store}>Finish</Link>
            :
            <div id="RoutineFinish" onClick={this.props.store}>Finish</div>
          }
        </div>
      </div>
    );
  }

}

export default RoutineHeader;
